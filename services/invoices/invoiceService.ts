import InvoiceRepository from "../../Repository/invoiceRepository";
import { Invoice } from "../../Models/index";
/**
 * Invoice Service
 * 
 * This service is responsible for managing the invoices of the system.
 * It communicates with the InvoiceRepository to perform the operations.
 * 
 * @class InvoiceService
 */
class InvoiceService {
    protected invoiceRepository: InvoiceRepository;
    constructor(invoiceRepository: InvoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    /**
     * Retrieves an invoice by id.
     * 
     * @param id - The id of the invoice to retrieve.
     * @returns The invoice with the specified id, or null if it doesn't exist.
     * @throws {Error} If an error occurs while retrieving the invoice.
     */
    async getInvoice(id: number): Promise<Invoice | null> {
        try {
            return await this.invoiceRepository.getInvoice(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting invoice');
            }
        }
    }

    async getOrders(): Promise<object | null> {
        try {
            return await this.invoiceRepository.getOrders();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting invoice');
            }
        }
    }
    
    async getOrderDetailsById(id: number): Promise<object | null> {
        try {
            return await this.invoiceRepository.getInvoiceByUserId(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting invoice');
            }
        }
    }

    async getOrdersByUserId(id: number): Promise<object | null> {
        try {
            return await this.invoiceRepository.getOrdersByUserId(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while getting invoice: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting invoice');
            }
        }
    }
}
export default InvoiceService;