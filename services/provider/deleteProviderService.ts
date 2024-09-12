import ProviderRepository from "../../Repository/providerRepository";

class ProviderDeleteService {
    protected providerRepository: ProviderRepository;
    constructor(providerRepository: ProviderRepository) {
        this.providerRepository = providerRepository;
    }
    async delete(id: number) {
        try {
            return await this.providerRepository.deleteProvider(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting provider: ${error.message}`);
            } else {
                throw new Error(`An unknown error occurred while deleting provider`);
            }
        }
    }
}
export default ProviderDeleteService;