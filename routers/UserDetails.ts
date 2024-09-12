import express from 'express';
import { authUser } from '../middlewares/jwtServices';
const routerUserDetails = express.Router();
routerUserDetails.use(express.json());

import {  uploadFileAvatarToFirebase, uploadAvatar } from '../middlewares/files';
//Import services
import { UserDetailsRepository, UserDetailsService, StorageService, ImageManager } from '../services/index';
//Services
const storageService = new StorageService();
const imageManagerService = new ImageManager();
const userDetailsRepository = new UserDetailsRepository(storageService);
const userDetailsService = new UserDetailsService(userDetailsRepository);

//Import Controllers
import UserDetailsController from '../controllers/userDetailsController';
// Controllers
const userDetailsController = new UserDetailsController(userDetailsService,storageService, imageManagerService);

routerUserDetails.get('/userDetails/:id', authUser, userDetailsController.getUserDetails);
routerUserDetails.put('/userDetails/update/:id', authUser, uploadAvatar,  uploadFileAvatarToFirebase, userDetailsController.updateUserDetails);
routerUserDetails.post('/userDetails/phone', authUser, userDetailsController.savePhone);
routerUserDetails.put('/userDetails/phone/update/:id', authUser, userDetailsController.updateUserPhone);
routerUserDetails.post('/userDetails/address', authUser ,userDetailsController.saveAddress);
routerUserDetails.put('/userDetails/address/update/:id', authUser, userDetailsController.updateUserAddress);
routerUserDetails.post('/userDetails/password/:id', authUser, userDetailsController.sendPasswodEmailChange);
routerUserDetails.put('/userDetails/password/update/:id', authUser, userDetailsController.updateUserPassword);
routerUserDetails.post('/usersAdmin/deleteAccount/:id', authUser, userDetailsController.deleteUser);

export default routerUserDetails;
