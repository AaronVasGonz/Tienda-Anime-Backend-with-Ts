import { Request, Response } from 'express';
import { InvoiceService, InvoiceUpdateService } from "../services/index";

class OrdersController {
    protected invoiceService: InvoiceService
    protected invoiceUpdateService: InvoiceUpdateService
    constructor(invoiceService: InvoiceService, invoiceUpdateService: InvoiceUpdateService) {
        this.invoiceService = invoiceService;
        this.invoiceUpdateService = invoiceUpdateService;
    }

    getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await this.invoiceService.getOrders();
            if (!orders) {
                return res.status(404).json({ error: 'Orders not found' });
            }
            res.status(200).json({ orders: orders });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    getOrdersByUserId = async (req: Request, res: Response) => {
        try {
            const idParam = req.params.id;
            const id = parseInt(idParam, 10);

            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID must be a number' });
            }

            const order = await this.invoiceService.getOrdersByUserId(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({ orders: order });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    getOrderDetailsById = async (req: Request, res: Response) => {
        try {
            const idParam = req.params.id;
            const id = parseInt(idParam, 10);

            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID must be a number' });
            }
            const invoice = await this.invoiceService.getOrderDetailsById(id);
            if (!invoice) {
                return res.status(404).json({ error: 'Invoice not found' });
            }

            console.log(invoice);
            res.status(200).json({ order: invoice });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    updateOrderStatus = async (req: Request, res: Response) => {
       console.log(req.body);
        const order_id = req.params.id;
        const id = parseInt(order_id, 10);
        try {
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID must be a number' });
            }
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({ error: 'Status is required' });
            }
            
            const order = await this.invoiceUpdateService.updateInvoice(id, status);

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({ message: 'Order status updated successfully' });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }

    }
}
export default OrdersController;