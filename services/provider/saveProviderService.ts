import ProviderRepository from "../../Repository/providerRepository";

class ProviderSaveService {
    protected providerRepository: ProviderRepository;
    constructor(providerRepository: ProviderRepository) {
        this.providerRepository = providerRepository;
    }

    async save(name: string, description: string, number: string, email: string, address: string, status: string) {
        try {
            return await this.providerRepository.saveProvider(name, description, number, email, address, status);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while saving provider: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving provider');
            }
        }
    }
}

export default ProviderSaveService;