import express from 'express';

const routerLogin = express.Router();

//import services

import {UserService, LoginService, LoginRepository, RoleLoginRepository, UserRepository, RoleRepository} from "../services/index";
//services & repositories
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
const userService = new UserService(userRepository);
const roleLoginRepository = new RoleLoginRepository();
const loginRepository = new LoginRepository(userService, roleLoginRepository);
const loginService = new LoginService(loginRepository, roleLoginRepository);

//import controllers
import LoginController from '../controllers/loginController';

//controllers
const loginController = new LoginController(userService, loginService);

routerLogin.use(express.urlencoded({ extended: false }));
routerLogin.use(express.json());

//asignamos la ruta post login para las request y los res desde el proyecto de react tienda anime
routerLogin.post('/login', loginController.login);

export default routerLogin;