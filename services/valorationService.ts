import ValorationRepository from '../Repository/valorationRepository';
class ValorationService {
    protected valorationRepository: ValorationRepository;
    constructor(valorationRepository: ValorationRepository) {
        this.valorationRepository = valorationRepository;;
    }

    async getValorationByProduct(id: number) {
        try {
            return await this.valorationRepository.getValorationsByProduct(id);
        } catch (error: unknown) {
           if (error instanceof Error) {
               throw new Error(`Error while getting valoration by product: ${error.message}`);
           } else {
               throw new Error(`An unknown error occurred while getting valoration by product`);
           }
        }
    }
}

export default ValorationService;


