import { Invoice } from "Models/index";
import {InvoiceService, InvoiceRepository} from "../index";
class InvoiceUpdateService extends InvoiceService {
    constructor(invoiceRepository: InvoiceRepository) {
        super(invoiceRepository);
    }

    async updateInvoice(id: number, status: string): Promise<Invoice | null> {
        try {
            return await this.invoiceRepository.updateInvoice(id, status); 
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while updating invoice: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating invoice');
            }
        }
    }
}

export default InvoiceUpdateService;