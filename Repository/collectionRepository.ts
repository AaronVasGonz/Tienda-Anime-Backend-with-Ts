import { Collection } from '../Models/index';
import { deleteFileFromFirebase } from '../utils/actions';

class CollectionRepository {

    async getCollections(): Promise<Collection[] | null> {
        try {
            return await Collection.findAll();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting collections: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting collections');
            }
        }
    }

    async getCollectionByName(name: string, fileNamePath: string | null): Promise<Collection[] | null> {
        const nametoLowerCase = name.toLowerCase();
        try {
            return await Collection.findAll({ where: { Nombre_Coleccion: nametoLowerCase } });
        } catch (error: unknown) {
            deleteFileFromFirebase(fileNamePath, 'collections');
            if (error instanceof Error) {
                throw new Error(`Error while getting collection by name: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting collection by name');
            }
        }
    }

    async getCollectionById(id: number): Promise<Collection | null> {
        try {
            return await Collection.findOne({ where: { id: id } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while getting collection by id: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while getting collection by id');
            }
        }
    }

    async saveCollection(Nombre_Coleccion: string, Descripcion: string, status: string, fileName: string | null): Promise<Collection | null> {
        try {
            return await Collection.create({ Nombre_Coleccion, Descripcion, status, imagen: fileName });
        } catch (error) {
            deleteFileFromFirebase(fileName, 'collections');
            if (error instanceof Error) {
                throw new Error(`Error while saving collection: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while saving collection');
            }
        }
    }

    async updateCollection(id: number, Nombre_Coleccion: string, Descripcion: string, status: string, imagen: string|null): Promise<number[] | null> {
        try {
            //obtain previous image path
            const result = await Collection.findOne({ where: { id: id } });
            if (!result) {
                throw new Error('Collection not found');
            }
            const previousImagePath = result.dataValues.imagen;

            if (imagen != null) {
                if (previousImagePath) {
                    //delete previous image
                    deleteFileFromFirebase(previousImagePath, 'collections');
                }
            } else {
                imagen = previousImagePath
            }
            return await Collection.update({ Nombre_Coleccion, Descripcion, status, imagen }, { where: { id: id } });

        } catch (error) {
            deleteFileFromFirebase(imagen, 'collections');
            if (error instanceof Error) {
                throw new Error(`Error while updating collection: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while updating collection');
            }
        }
    }

    async deleteCollection(id: number): Promise<number[] | null> {
        try {
            return await Collection.update({ status: 'Inactivo' }, { where: { id: id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting collection: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while deleting collection');
            }
        }
    }
}

export default CollectionRepository;