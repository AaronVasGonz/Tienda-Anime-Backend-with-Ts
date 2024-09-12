import PaymentRepository from "../../Repository/paymentRepository";
import { NewInvoiceIdResult } from "../../Repository/paymentRepository";
/**
 * Service for managing payments
 *
 * This service is responsible for managing the payments of the system.
 * It communicates with the PaymentRepository to perform the operations.
 * @class PaymentService
 */
class PaymentService {
    private paymentRepository: PaymentRepository;
    constructor(paymentRepository: PaymentRepository) {
        this.paymentRepository = paymentRepository
    }

    /**
     * Saves a new payment on the database.
     * @param {number} userId the user id
     * @param {number} productsId the products id
     * @param {string} holderName the holder name
     * @param {number} id the id
     * @param {string} address the address
     * @param {Date} date the date
     * @param {number} total the total
     * @param {number} quintities the quintities
     * @param {number} prices the prices
     * @return {Promise<NewInvoiceIdResult | null>} the saved payment or null if the operation fails
     */
    async savePayment(userId: number, productsId: number, holderName: string, id: number, address: string, date: Date, total: number, quintities: number, prices: number): Promise<NewInvoiceIdResult | null> {
        try {
            return await this.paymentRepository.savePayment(userId, productsId, holderName, id, address, date, total, quintities, prices);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while saving payment: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while saving payment`);
            }
        }
    }
}

export default PaymentService;