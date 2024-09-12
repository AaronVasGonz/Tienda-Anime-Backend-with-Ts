

import { Collection } from "../../Models/index";
/**
 * This class contains the methods for saving a collection
 * @class CollectionSaveService
 * @param {CollectionRepository} collectionRepository - The collection repository
 */
import CollectionRepository from "Repository/collectionRepository";
class CollectionSaveService {
    private collectionRepository;
    /**
     * The constructor for CollectionSaveService
     * @param {CollectionRepository} collectionRepository - The collection repository
     */
    constructor(collectionRepository: CollectionRepository) {
        this.collectionRepository = collectionRepository;
    }
    /**
     * This method saves a collection to the database
     * @param {string} Nombre_Coleccion - The name of the collection
     * @param {string} Descripcion - The description of the collection
     * @param {string} status - The status of the collection
     * @param {string} fileName - The name of the file to upload
     * @returns {Promise<Collection | null>} - The saved collection or null if an error occurs
     */
    async saveCollection(Nombre_Coleccion: string, Descripcion: string, status: string, fileName: string | null): Promise<Collection | null> {
        try {
            return await this.collectionRepository.saveCollection(Nombre_Coleccion, Descripcion, status, fileName);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while saving collection: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving collection');
            }
        }
    }
}
export default CollectionSaveService;
