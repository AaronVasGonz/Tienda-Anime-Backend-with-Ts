import ProviderRepository from "../../Repository/providerRepository";

class ProviderUpdateService {
    protected providerRepository: ProviderRepository;
    constructor(providerRepository: ProviderRepository) {
        this.providerRepository = providerRepository;
    }

    async update(id: number, name: string, description: string, number: string, email: string, address: string, status: string) {
        try {
            return await this.providerRepository.updateProvider(id, name, description, number, email, address, status);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while updating provider: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating provider');
            }
        }
    }
}
export default ProviderUpdateService;