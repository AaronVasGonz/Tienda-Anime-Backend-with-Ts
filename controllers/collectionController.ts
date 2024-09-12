import { StorageService, CollectionService, CollectionSaveService, CollectionUpdateService, CollectionDeleteService } from "../services/index";
import { Request, Response } from 'express';

export interface RequestWithUrl extends Request {
    fileUrl?: string | null;
    fileUrls?: string[] ;
}

class CollectionController {

    protected collectionService: CollectionService;
    protected collectionSaveService: CollectionSaveService;
    protected collectionUpdateService: CollectionUpdateService;
    protected collectionDeleteService: CollectionDeleteService;
    protected storageService: StorageService;

    constructor(collectionService: CollectionService, collectionSaveService: CollectionSaveService, collectionUpdateService: CollectionUpdateService, collectionDeleteService: CollectionDeleteService, storageService: StorageService) {
        this.collectionService = collectionService;
        this.collectionSaveService = collectionSaveService;
        this.collectionUpdateService = collectionUpdateService;
        this.collectionDeleteService = collectionDeleteService;
        this.storageService = storageService;
    }

    getCollections = async (req: Request, res: Response) => {
        try {
            const collections = await this.collectionService.getCollections();

            if (!collections) {
                return res.status(404).json({ error: 'Collections not found' });
            }

            const collectionsWithImages = collections.map((collection) => {
                return { ...collection.dataValues, imageUrl: collection.dataValues.imagen };
            });

            res.json({ collections: collectionsWithImages });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Server error' });
            }
        }
    }

    getCollection = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        try {
            const result = await this.collectionService.getCollectionById(id);

            if (!result) {
                return res.status(404).json({ error: 'Collection not found' });
            }

            return res.status(200).json({ collection: result.dataValues });
        } catch (error) {
            console.error("Error while getting collection:", error);
            return res.status(500).json({ error: 'Error while getting collection' });
        }
    }

    saveCollection = async (req: RequestWithUrl, res: Response) => {
        const { Nombre_Coleccion, Descripcion, status } = req.body;
        const fileUrl = req.fileUrl || null;

        if (!Nombre_Coleccion) {
            this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
            return res.status(400).json({ error: 'The collection name is required' });
        }
        
        try {
            const results = await this.collectionService.getCollectionByName(Nombre_Coleccion, fileUrl);

            if (results && results.length > 0) {
                this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
                return res.status(400).json({ error: 'The collection already exists' });
            }

            const result = await this.collectionSaveService.saveCollection(Nombre_Coleccion, Descripcion, status, fileUrl);

            if (!result) {
                this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
                return res.status(500).json({ error: 'Error while inserting collection in the database' });
            }

            return res.status(200).json({ message: 'Collection inserted successfully' });

        } catch (error) {
            this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
            console.error("Error while saving collection:", error);
            return res.status(500).json({ error: 'Error while saving collection' });
        }
    }

    updateCollection = async (req: RequestWithUrl, res: Response) => {
        const fileUrl = req.fileUrl || null;
        const {  Nombre_Coleccion, Descripcion, status } = req.body;
        const idParam = req.params.id;        
        const numericId = parseInt(idParam, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Valid collection id is required' });
        }

        try {
            const result = await this.collectionUpdateService.updateCollection(numericId, Nombre_Coleccion, Descripcion, status, fileUrl);

            if (!result) {
                return res.status(500).json({ error: 'Error while updating collection in the database' });
            }

            res.status(200).json({ message: 'Collection updated successfully' });
        } catch (error) {
            this.storageService.deleteFileFromFirebase(fileUrl, 'collections');
            console.error("Error while updating collection:", error);
            res.status(500).json({ error: 'Error while updating collection' });
        }
    }

    deleteCollection = async (req: Request, res: Response) => {
        const idParam = req.params.id;        
        const numericId = parseInt(idParam, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'ID must be a number' });
        }

        try {
            const result = await this.collectionDeleteService.deleteCollection(numericId);

            if (!result) {
                return res.status(500).json({ error: 'Error while deleting collection in the database' });
            }

            res.status(200).json({ message: 'Collection deleted successfully' });
        } catch (error) {
            console.error("Error while deleting collection:", error);
            res.status(500).json({ error: 'Error while deleting collection' });
        }
    }
}

export default CollectionController;