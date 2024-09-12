import { sendEmailByClient } from "../../utils/nodemailer";

class ContactService {
    async sendContactEmail(name: string, email: string, subject: string, message: string): Promise<boolean | null> {
        try {
            return await sendEmailByClient(name, email, subject, message);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while sending contact email: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while sending contact email');
            }
        }
    }
}
export default ContactService;
