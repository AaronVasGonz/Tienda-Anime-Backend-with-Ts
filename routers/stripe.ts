import express from 'express';
const routerStripe = express.Router();
import {authUser} from '../middlewares/jwtServices';

//importing services and repositories
import { PaymentRepository, PaymentService, InvoiceRepository, InvoiceService } from '../services/index';
//repositories
const invoiceRepository = new InvoiceRepository();
const paymentRepository = new PaymentRepository();

//services
const invoiceService = new InvoiceService(invoiceRepository);
const paymentService = new PaymentService(paymentRepository);

//importing controllers
import PaymentController from '../controllers/paymentController';
//controllers
const paymentController = new PaymentController(paymentService, invoiceService);

routerStripe.post('/create-checkout-session', authUser , paymentController.savePayment);

export default routerStripe;