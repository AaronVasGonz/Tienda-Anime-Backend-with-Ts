import ProviderRepository from "../../Repository/providerRepository";


class ProviderService {
    protected providerRepository: ProviderRepository
    constructor(providerRepository: ProviderRepository) {
        this.providerRepository = providerRepository;
    }

    async getProviders() {
        return await this.providerRepository.getProviders();
    }

    async getProviderById(id: number) {
        return await this.providerRepository.getProviderById(id);
    }
}

export default ProviderService;