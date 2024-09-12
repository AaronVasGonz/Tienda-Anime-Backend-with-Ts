import express from 'express';
const routerRegistro = express.Router();
import { validateSignUp } from '../utils/validation/validateSignUp';
//import services and repositories
import { UserService, SignUpRepository, SignUpService, UserRepository, RoleRepository } from '..//services/index';
//Services 
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
const signUpRepository = new SignUpRepository();
const userService = new UserService(userRepository);
const signUpService = new SignUpService(signUpRepository);
//Import controller 
import SignUpController from '../controllers/signUpController';
//Controller 
const signUpController = new SignUpController(userService, signUpService);
//Middleware
routerRegistro.use(express.json());
routerRegistro.post("/registro", validateSignUp, signUpController.signUp);

export default routerRegistro;