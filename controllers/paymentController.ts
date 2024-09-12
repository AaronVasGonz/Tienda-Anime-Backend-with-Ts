import Stripe from 'stripe';
import process from 'process';
import { sendElectronicalInvoice } from '../utils/nodemailer';
import { PaymentService, InvoiceService } from  "../services/index";
import { Request, Response } from 'express';
import { extendedInvoice } from '../utils/nodemailer';

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) throw new Error('Stripe key not found');
const stripe = new Stripe(stripeKey);

class PaymentController {
    protected paymentService: PaymentService;
    protected invoiceService: InvoiceService;

    constructor(paymentService: PaymentService, invoiceService: InvoiceService) {
        this.paymentService = paymentService;
        this.invoiceService = invoiceService;
    }
    
    savePayment = async (req: Request, res: Response) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const user: any = req.user;
            
            // eslint-disable-next-line prefer-const
            let { id, amount, name, address, idProducts, CostumerId, prices, quantityProducts } = req.body;
            
            const date = new Date();
            amount = Math.round(amount * 100);
            prices = prices.join(',');
            idProducts = idProducts.join(',');
            quantityProducts = quantityProducts.join(',');

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                description: 'Payment for products',
                payment_method: id,
                confirm: true,
                return_url: 'http://localhost:3000',
                payment_method_options: {
                    card: {
                        request_three_d_secure: 'any',
                    },
                },
            });

            if (!paymentIntent) {
                return res.status(500).json({ message: 'Error while saving payment' });
            }

            const total = amount / 100;
            const idUser = user.id;
            const result = await this.paymentService.savePayment(idUser, idProducts, name, CostumerId, address, date, total, quantityProducts, prices);

            if (!result) {
                return res.status(500).json({ error: 'Error while saving payment' });
            }

            const invoiceId = result.id_factura;
            const invoice = await this.invoiceService.getInvoice(invoiceId);

            if (!invoice) {
                return res.status(500).json({ error: 'Error while retrieving invoice' });
            }

            const invoiceExtended = invoice as extendedInvoice;
            await sendElectronicalInvoice(user, invoiceExtended);

            res.json({ message: 'Payment saved successfully', clientSecret: paymentIntent.client_secret });

        } catch (error) {
            console.error('Error while saving payment:', error);
            res.status(500).json({ error: 'Error while saving payment' });
        }
    }
}

export default PaymentController;