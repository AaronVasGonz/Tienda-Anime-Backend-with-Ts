

import { verifyUser } from '../utils/jwt';
import { AuthenticationService, RoleRepository, UserRepository, UserService } from '../services/index';
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
import { UserObjectToken } from '../controllers/loginController';
const userService = new UserService(userRepository);
const authenticationService = new AuthenticationService(roleRepository);
import express from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: unknown; // Define el tipo que corresponde a `userObject`
    }
}

const authenticateToken = async (accessToken: string): Promise<UserObjectToken> => {
    try {
        const payload = await verifyUser(accessToken);

        const userObject = payload as UserObjectToken;

        const { correo, id } = userObject;
        const verifyId = await userService.getUserById(id);

        if (!verifyId) throw new Error('Invalid credentials');

        if (!correo) throw new Error('Invalid credentials');

        const results = await userService.getUserByEmail(correo);
        if (!results) throw new Error('Invalid credentials');

        if (!id) throw new Error('Invalid credentials');

        return userObject;

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

const authAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Obtiene el token de acceso de los headers
        const authorizationHeader = req.headers['authorization'];
        
        // Verifica si el token de acceso fue proporcionado
        if (!authorizationHeader) {
            return res.status(401).json({ error: "Authorization token not provided" });
        }

        // Valida y autentica el token
        const userObject = await authenticateToken(authorizationHeader);
        
        // Verifica si el token contiene un ID de usuario válido
        if (!("id" in userObject)) {
            return res.status(403).json({ error: "Invalid token" });
        }

        const { id } = userObject;

        // Verifica si el usuario tiene el rol de administrador
        const adminResults = await authenticationService.getAdminRoleById(id);
        if (!adminResults) {
            return res.status(403).json({ error: "Access denied. Admin role required." });
        }

        // Continúa con la siguiente función de middleware
        next();
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Manejo de errores específicos
            return res.status(403).json({ error: error.message });
        } else {
            // Error genérico si no es una instancia de Error
            return res.status(403).json({ error: "Invalid token" });
        }
    }
};


const authUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(401).json({ error: "Authorization token not provided" });
    }
    try {
        const userObject = await authenticateToken(accessToken);
        const { id } = userObject;

        const role = await authenticationService.getUserRole(id);
        if (!role) {
            return res.status(403).json({ error: "Access denied." });
        }

        req.user = userObject;
        const userId = userObject.id.toString();
        req.params.id = userId;
        next();
    } catch (error:unknown) {
        if (error instanceof Error) {
            return res.status(403).json({ error: error.message });
        } else {
            return res.status(403).json({ error: "Invalid token" });
        }
    }
}

export { authAdmin, authUser };


