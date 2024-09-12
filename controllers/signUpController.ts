
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import{ UserService, SignUpService } from "../services/index";
import { sendConfirmationEmail } from "../utils/nodemailer";
import { Request, Response } from "express";
class SignUpController {
    protected userService: UserService;
    protected signUpService: SignUpService;
    constructor(userService: UserService, signUpService: SignUpService) {
        this.userService = userService;
        this.signUpService = signUpService;
    }

    signUp = async (req:Request, res:Response) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, nombre, apellido, apellido2, password } = req.body;

        const SalRounds = 10;

        try {
            const { exists, message } = await this.userService.checkExistingEmail(email);
            if (exists) {
                return res.status(400).json({ error: message });
            }
            
            const passwordHash = await bcrypt.hash(password, SalRounds);
            if (!passwordHash) {
                return res.status(500).json({ error: 'Failed to hash password' });
            }
    
            const result = await this.signUpService.signUp(nombre, apellido, apellido2, email, passwordHash);
            if (!result) {
                return res.status(500).json({ error: 'Failed to create user' });
            }

            const user = { id: result.user.dataValues.id, nombre, email, correo: email };

            const host = req.headers.host ? req.headers.host.toString() : '';

            const verifyConfirmationEmail = await sendConfirmationEmail(user, host);
            if (!verifyConfirmationEmail) {
                return res.status(500).json({ error: 'Failed to send confirmation email' });
            }
            return res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

export default SignUpController;