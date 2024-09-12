import express from "express";

//import services and repositories
import { InvoiceRepository, InvoiceService, InvoiceUpdateService } from "../services/index";
import { authUser, authAdmin } from "../middlewares/jwtServices";
//services and repositories
const invoiceRepository = new InvoiceRepository();
const invoiceService = new InvoiceService(invoiceRepository);
const invoiceUpdateService = new InvoiceUpdateService(invoiceRepository);
//import controllers
import OrdersController from "../controllers/ordersController";


//controllers
const ordersController = new OrdersController(invoiceService, invoiceUpdateService);
const routerOrders = express.Router();

//admin
routerOrders.get('/orders', authAdmin, ordersController.getOrders);
routerOrders.put('/orders/:id', authAdmin, ordersController.updateOrderStatus);

//user
routerOrders.get('/userOrders', authUser, ordersController.getOrdersByUserId);

routerOrders.get('/orderDetails/:id', authUser, ordersController.getOrderDetailsById);
export default routerOrders;