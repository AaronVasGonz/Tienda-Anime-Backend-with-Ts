// ../functions/nodemailer.js
import nodemailer, { SendMailOptions } from 'nodemailer';
import jwt from 'jsonwebtoken';
import { Invoice } from 'Models';

interface Product {
    id_factura: number;
    nombre_producto: string;
    precio: number;
    cantidad: number;
    total: number;
}

interface User {
    id: number;
    email: string;
    correo: string;
    nombre: string;
}

export interface extendedInvoice extends Invoice {
    products: Product[];
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Función para enviar correo usando promesas
const sendMail = (mailOptions: SendMailOptions): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
                return reject(false);
            } else {
                return resolve(true);
            }
        });
    });
};

async function sendConfirmationEmail(user: User, host: string): Promise<boolean> {
    const tokenPayload = { userId: user.id };
    const secret = process.env.SECRET;
    if (!secret) {
        throw new Error('No secret provided');
    }
    const token = jwt.sign(tokenPayload, secret, { expiresIn: '190m' });
    const confirmationUrl = `http://${host}/api/confirm-account?token=${token}`;
    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: user.email,
        subject: 'Confirm Account',
        html: `
            <p>Hello ${user.nombre}!</p>
            <p>Thank you for registering with our application. Please confirm your account by clicking on the following link:</p>
            <a href="${confirmationUrl}">${confirmationUrl}</a>
        `
    };
    try {
        await sendMail(mailOptions);
        console.log('Confirmation email sent successfully');
        return true;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending confirmation email:', error.message);
            return false;
        } else {
            console.error('Error sending confirmation email:', error);
            return false;
        }
    }
}

async function sendResetPasswordEmail(user: User, host: string): Promise<boolean> {

    console.log(user.correo);

    const id = user.id;
    const tokenPayload = { userId: id };
    const secret = process.env.SECRET;
    if (!secret) {
        throw new Error('No secret provided');
    }
    const token = jwt.sign(tokenPayload, secret, { expiresIn: '190m' });
    const resetPasswordUrl = `http://${host}/api/reset-password?token=${token}`;
    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: user.correo,
        subject: 'Reset Password',
        html: `
            <p>Hello ${user.nombre}!</p>
            <p>You requested a password reset. Please click on the following link to reset your password:</p>
            <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
        `
    };
    try {
        const result = await sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}
async function sendElectronicalInvoice(user: User, invoice: extendedInvoice): Promise<boolean> {
    let id_factura = 0;
    let total = 0;
    const date = new Date();

    invoice?.products?.forEach(product => {
        id_factura = product.id_factura;
        total = product.total;
    });

    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: user.email,
        subject: 'Electronic Invoice',
        html: `
            <h1>Electronic Invoice</h1>
            <h2>Anime WebShop Store</h2>
            <p>Dear Customer ${user.nombre}, here is your electronic invoice</p>
            <p>Invoice Number: ${id_factura}</p>
            <p>Date: ${date.toLocaleDateString()}</p>
            <table style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Product</th>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Price</th>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Quantity</th>
                        <th style="border: 1px solid #b07bdc; padding: 8px; text-align: left; background-color: #b07bdc; color: white;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice?.products?.map(product => `
                        <tr>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">${product.nombre_producto}</td>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">$${product.precio}</td>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">${product.cantidad}</td>
                            <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">$${product.cantidad * product.precio}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="border: 1px solid #b07bdc; padding: 8px; text-align: left;">Total:</td>
                        <td style="border: 1px solid #b07bdc; padding: 8px; text-align: left; font-weight: bold; background-color: #b07bdc; color: white;">$${total}</td>
                    </tr>
                </tfoot>
            </table>
        `
    };
    try {
        await sendMail(mailOptions);
        console.log('Electronic invoice sent successfully');
        return true
    } catch (error) {
        console.error('Error sending electronic invoice:', error);
        return false;
    }
}
const sendEmailByClient = async (name: string, email: string, subject: string, clientMessage: string): Promise<boolean> => {
    const mailOptions = {
        from: 'arjoz988@gmail.com',
        to: 'arjoz988@gmail.com',
        subject: `Mensaje de cliente: ${subject}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${clientMessage}`,
        html: `<p><strong>Nombre:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Mensaje:</strong></p>
               <p>${clientMessage}</p>`
    }
    try {
        const result = await sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export { sendConfirmationEmail, sendResetPasswordEmail, sendElectronicalInvoice, sendEmailByClient };
