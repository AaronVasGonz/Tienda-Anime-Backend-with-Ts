import express from 'express';
const routerAtuh = express.Router();
import authMiddleware from '../middlewares/authMiddleware';
import { verifyUser } from '../utils/jwt';

routerAtuh.use(express.json());

//import services and repositories
import { AuthenticationService, RoleRepository, UserRepository, UserService } from '../services/index';
//repositories
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
//services
const userService = new UserService(userRepository);
const authenticationService = new AuthenticationService(roleRepository);
//imrport controllers
import AuthUserController from '../controllers/authUserController';

//controllers
const authUserController = new AuthUserController(userService, authenticationService ,verifyUser);


routerAtuh.get('/auth', authMiddleware, (req, res) => {
    res.json({ message: 'Token válido', user: req.user });
});

routerAtuh.get('/confirm-account', authUserController.confirmAccount);

routerAtuh.get('/reset-password', authUserController.resetPassword);

export default routerAtuh;
