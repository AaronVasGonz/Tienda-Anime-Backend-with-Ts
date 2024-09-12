import CollectionRepository from '../../Repository/collectionRepository';

/**
 * This class contains the methods for deleting collections
 * @class CollectionDeleteService
 * @param {CollectionRepository} collectionRepository - The collection repository
 */
class CollectionDeleteService {
    private collectionRepository: CollectionRepository
    constructor(collectionRepository: CollectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    /**
     * This method deletes a collection by id
     * @param {number} id - The id of the collection
     * @returns {Promise<number[] | null>} - The deleted collection or null if an error occurs
     */
    async deleteCollection(id: number): Promise<number[] | null> {
        try {
            return await this.collectionRepository.deleteCollection(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting collection: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting collection');
            }
        }
    }
}
export default CollectionDeleteService;
