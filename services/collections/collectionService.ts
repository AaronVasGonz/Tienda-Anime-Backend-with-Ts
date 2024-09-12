import { Collection } from '../../Models/index';
import CollectionRepository from '../../Repository/collectionRepository';
/**
 * This class contains the methods for handling the collections
 * @class CollectionService
 * @param {CollectionRepository} collectionRepository - The collection repository
 */
class CollectionService {
    private collectionRepository: CollectionRepository
    /**
     * The constructor for CollectionService
     * @param {CollectionRepository} collectionRepository - The collection repository
     */
    constructor(collectionRepository: CollectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    /**
     * This method retrieves all collections from the database
     * @returns {Promise<Collection[] | null>} - The collections or null if an error occurs
     */
    async getCollections(): Promise<Collection[] | null> {
        try {
            return await this.collectionRepository.getCollections();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting collections: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting collections');
            }
        }
    }

    /**
     * This method retrieves a collection by name from the database
     * @param {string} name - The name of the collection
     * @param {string} fileNamePath - The path of the file to upload
     * @returns {Promise<Collection[] | null>} - The collections or null if an error occurs
     */
    async getCollectionByName(name: string, fileNamePath: string | null): Promise<Collection[] | null> {
        try {
            return await this.collectionRepository.getCollectionByName(name, fileNamePath);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting collection by name: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting collection by name');
            }
        }
    }

    /**
     * This method retrieves a collection by id from the database
     * @param {number} id - The id of the collection
     * @returns {Promise<Collection | null>} - The collection or null if an error occurs
     */
    async getCollectionById(id: number): Promise<Collection | null> {
        try {
            return await this.collectionRepository.getCollectionById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting collection by id: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting collection by id');
            }
        }
    }
}
export default CollectionService;
