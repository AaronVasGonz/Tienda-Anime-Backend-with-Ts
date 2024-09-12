
import express from 'express';
const routerContact = express.Router();
import { validateContact } from '../utils/validation/validateContact';
//import Services
import { ContactService } from '../services/index';
//services
const contactService = new ContactService();
//import controllers
import ContactController from '../controllers/contactController';
//Controllers
const contactController = new ContactController(contactService);
//Middleware
routerContact.use(express.json());
// Validate fields
routerContact.post('/contact', validateContact , contactController.contact)

export default routerContact;