import { UserService, AuthenticationService } from '../services';
type VerifyUserFunction = (token: string) => Promise<unknown>;
import express from 'express';
interface UserObject {
    userId: number;
}
class AuthUserController {
    protected userService: UserService;
    protected verifyUser: VerifyUserFunction;
    protected authUserService: AuthenticationService;
    constructor(userService: UserService, authUserService: AuthenticationService, verifyUser: VerifyUserFunction) {
        this.userService = userService;
        this.verifyUser = verifyUser;
        this.authUserService = authUserService;
    }

    confirmAccount = async (req: express.Request, res: express.Response) => {
        const { token } = req.query;

        if (!token || typeof token !== 'string') {
            return res.status(400).json({ error: 'Token not provided or invalid' });
        }

        try {
            const decoded = await this.verifyUser(token);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }
            const userObject = decoded as UserObject;
            const { userId } = userObject;

            if (!userId) {
                return res.status(400).json({ error: 'Invalid token payload' });
            }

            const result = await this.userService.getUserById(userId);
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }

            const confirmed = await this.authUserService.confirmAccount(userId);
            if (!confirmed) {
                return res.status(500).json({ error: 'Error while confirming account' });
            }

            res.redirect('http://localhost:3000/login?confirm=true');
        } catch (error) {
            console.log('Error in confirmAccount:', error);
            res.status(500).json({ error: 'Error while confirming account' });
        }
    }

    resetPassword = async (req: express.Request, res: express.Response) => {
        try {
            const token = req.query.token;

            if (!token || typeof token !== 'string') {
                return res.status(400).json({ error: 'Token not provided' });
            }

            const decoded = await this.verifyUser(token);
            if (!decoded) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }
            const userObject = decoded as UserObject;
            const { userId } = userObject;
            const result = await this.userService.getUserById(userId);

            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }

            const user = result;

            res.redirect('http://localhost:3000/settings/passwordChanger/updatePassword?token=' + token + '&email=' + user.correo + '&confirm=true');

        } catch (error: unknown) {
           if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }else{
                return res.status(500).json({ error: 'Error while resetting password' });
            }
        }
    }
}

export default AuthUserController;