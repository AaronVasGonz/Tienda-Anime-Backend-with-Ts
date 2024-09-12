import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { UserService, LoginService } from "../services/index";
import { Request, Response } from 'express';


export interface UserObjectToken {
    id: number;
    correo: string;
    nombre: string;
}

interface UserDetails {
    id: number;
    correo: string;
    nombre: string;  
    roles: {
        rolUsuario: boolean | string;
        roleAdministrador: boolean | string;
    };
}


class LoginController {
    private userService: UserService;
    private loginService: LoginService;

    constructor(userService: UserService, loginService: LoginService) {
        this.userService = userService;
        this.loginService = loginService;
    }

    login = async (req: Request, res: Response) => {
        const { correo, password } = req.body;
        try {
            const userDb = await this.verifyUserData(correo, password);
            if (!userDb) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const verify = await this.loginService.verifyUser(correo);
            if (verify === "Inactivo") {
                return res.status(400).json({
                    error: "Your account is not active. Please verify your email, or contact the administrator if you believe this is an error."
                });
            }

            const userDetails = await this.verifyRoles(userDb);

            if (!userDetails) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const accessToken = this.generateAccessToken(userDetails);

            res.header('Authorization', `Bearer ${accessToken}`).json({
                message: 'User authenticated successfully',
                token: accessToken,
                user: userDetails
            });

        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    private async verifyUserData(correo: string, password: string) {
        const userDb = await this.userService.getUserByEmail(correo);
        if (!userDb) {
            throw new Error("User not found");
        }

        const verifyPassword = await bcrypt.compare(password, userDb.password);
        if (!verifyPassword) {
            throw new Error("Invalid credentials");
        }

        return userDb;
    }

    private async verifyRoles(user: UserObjectToken) {
        const rolesData = await this.loginService.getUserRoles(user.id);
        if (!rolesData) {
            throw new Error("Invalid credentials");
        }

        const userDetails: UserDetails = {
            id: user.id,
            correo: user.correo,
            nombre: user.nombre,
            roles: {
                rolUsuario: rolesData.roleUser,
                roleAdministrador: rolesData.roleAdmin
            },
        };
        return userDetails;
    }

    private generateAccessToken(user: UserDetails) {
        const secret = process.env.SECRET;
        if (!secret) {
            throw new Error("Secret not found");
        }
        return jwt.sign(user, secret, { expiresIn: '190m' });
    }
}

export default LoginController;
