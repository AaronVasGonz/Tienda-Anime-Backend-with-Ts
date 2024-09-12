
import { validationResult } from 'express-validator';
import { ContactService } from "../services/index";
import { Request, Response } from 'express';
class ContactController {
    protected contactService: ContactService;
    constructor(contactService: ContactService) {
        this.contactService = contactService;
    }
    contact = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, subject, email, message } = req.body;

        if (!name || !subject || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        try {

            const emailSending = await this.contactService.sendContactEmail(name, email, subject, message);

            if (!emailSending) {
                return res.status(500).json({ error: 'Error while sending email' });
            }

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error: unknown) {
           if (error instanceof Error) {
               return res.status(500).json({ error: error.message });
           } else {
               return res.status(500).json({ error: 'Server error' });
           }
        }
    }
}

export default ContactController;