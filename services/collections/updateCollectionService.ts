import CollectionRepository from '../../Repository/collectionRepository';
/**
 * This class contains the methods for updating a collection
 * @class CollectionUpdateService
 * @param {CollectionRepository} collectionRepository - The collection repository
 */
class CollectionUpdateService {
    private collectionRepository: CollectionRepository;
    constructor(collectionRepository: CollectionRepository) {
        this.collectionRepository = collectionRepository;
    }

    /**
     * This method updates a collection
     * @param {number} id - The id of the collection
     * @param {string} Nombre_Coleccion - The name of the collection
     * @param {string} Descripcion - The description of the collection
     * @param {string} status - The status of the collection
     * @param {string} imagen - The image of the collection
     * @returns {Promise<number[] | null>} - The updated collection or null if an error occurs
     */
    async updateCollection(id:number , Nombre_Coleccion: string, Descripcion: string, status: string, imagen: string|null): Promise<number[] | null>{
        try {
            return await this.collectionRepository.updateCollection(id, Nombre_Coleccion, Descripcion, status, imagen);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while updating collection: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating collection');
            }
        }
    }
}
export default CollectionUpdateService;

