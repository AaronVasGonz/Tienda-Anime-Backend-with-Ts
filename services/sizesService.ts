import SizeRepository from '../Repository/sizesRepository';
class SizesService {
    protected sizeRepository: SizeRepository;

    constructor(sizeRepository: SizeRepository) {
        this.sizeRepository = sizeRepository;
    }
    async getSizes() {
        try {
            return await this.sizeRepository.getSizes();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting sizes: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting sizes');
            }
        }
    }

    async getSizeById(id: number) {
        try {
            return await this.sizeRepository.getSizesById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting size by id: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting size by id');
            }
        }
    }
}

export default SizesService;