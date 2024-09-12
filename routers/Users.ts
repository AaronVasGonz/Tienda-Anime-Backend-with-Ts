import express from 'express';
const routerUsersAdmin = express.Router();
import { authAdmin } from '../middlewares/jwtServices';
import cors from 'cors';
import { validateUser } from '../utils/validation/validateUsers';
//Import services
import { RoleRepository, UserRepository, UserService, UserSaveService, UserUpdateService, UserDeleteService } from '../services/index';
//Services
const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
const userService = new UserService(userRepository);
const userSaveService = new UserSaveService(userRepository);
const userUpdateService = new UserUpdateService(userRepository);
const userDeleteService = new UserDeleteService(userRepository);
//importing controllers
import UsersController from '../controllers/usersController';
//Controllers
const usersController = new UsersController(userService, userSaveService, userUpdateService, userDeleteService);
//*Protected users routes */
routerUsersAdmin.use(express.json());
routerUsersAdmin.use(cors());
routerUsersAdmin.get('/usersAdmin', authAdmin, usersController.getUsers);
routerUsersAdmin.post('/usersAdmin', authAdmin, validateUser, usersController.createUser);
routerUsersAdmin.get('/usersAdmin/:id', authAdmin, usersController.getUser);
routerUsersAdmin.put('/usersAdmin/:id', authAdmin, usersController.updateUser);
routerUsersAdmin.delete('/usersAdmin/:id', authAdmin, usersController.deleteUser);

export default routerUsersAdmin;
