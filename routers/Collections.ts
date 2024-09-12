import express from 'express';
const routerCollection = express.Router();
import { authAdmin } from '../middlewares/jwtServices';
import cors from 'cors';
import { fileUpload, uploadFileCollectionsToFirebase } from '../middlewares/files';

routerCollection.use(cors());

import {CollectionRepository, CollectionService, CollectionSaveService, CollectionUpdateService, CollectionDeleteService,StorageService} from '../services/index';
//Services
const collectionRepository = new CollectionRepository();
const collectionService = new CollectionService(collectionRepository);
const collectionSaveService = new CollectionSaveService(collectionRepository);
const collectionUpdateService = new CollectionUpdateService(collectionRepository);
const collectionDeleteService = new CollectionDeleteService(collectionRepository);
const storageService = new StorageService();
//Controllers
import CollectionController from '../controllers/collectionController';
const collectionController = new CollectionController(collectionService, collectionSaveService, collectionUpdateService, collectionDeleteService, storageService);

/*Protected collection routes */
routerCollection.get('/collections', authAdmin, collectionController.getCollections);
routerCollection.post('/collections', authAdmin, fileUpload, uploadFileCollectionsToFirebase, collectionController.saveCollection);
routerCollection.get('/collections/:id', authAdmin, collectionController.getCollection);
routerCollection.post('/collections/:id', authAdmin, fileUpload, uploadFileCollectionsToFirebase, collectionController.updateCollection);
routerCollection.delete('/collections/:id', authAdmin, collectionController.deleteCollection);
/* Public collection routes */
routerCollection.get('/public/collections', collectionController.getCollections);

export default routerCollection;

