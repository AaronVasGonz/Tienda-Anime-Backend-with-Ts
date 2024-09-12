import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';

const bucket = admin.storage().bucket();
const memoryStorage = multer.memoryStorage();

const fileUpload = multer({
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('imagen');

const uploadAvatar = multer({
    storage: memoryStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('avatar');

const uploadFiles = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB (límite por archivo)
        fieldSize: 200 * 1024 * 1024 // 200 MB (límite para todos los campos de texto/datos combinados)
    }
}).array('fileImages');

interface RequestWithFileUrl extends express.Request {
    fileUrl?: string | null;
    fileUrls?: string[] | null;
    file?: Express.Multer.File;
    files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

interface FileWithOriginalName extends Express.Multer.File {
    extraField?: string;
}

const uploadFileAvatarToFirebase = async (req: RequestWithFileUrl, res: express.Response, next: express.NextFunction) => {
    if (!req.file) {
        req.fileUrl = null;
        return next();
    }

    try {
        const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800)
            .toFormat('webp')
            .toBuffer();

        const tempLocalFile = path.join(__dirname, '../images/avatar', filename);
        await fs.promises.writeFile(tempLocalFile, processedImageBuffer);

        await bucket.upload(tempLocalFile, {
            destination: `images/avatar/${filename}`,
            metadata: {
                contentType: 'image/webp',
            },
        });

        const [url] = await bucket.file(`images/avatar/${filename}`).getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });

        await fs.promises.unlink(tempLocalFile);
        req.fileUrl = url;
        next();
    } catch (error) {
        console.error('Error uploading file to Firebase:', error);
        res.status(500).send('Error uploading file');
    }
};

const uploadFileCollectionsToFirebase = async (req: RequestWithFileUrl, res: express.Response, next: express.NextFunction) => {
    if (!req.file) {
        console.log('No file uploaded');
        return next();
    }

    try {
        const fileName = `${Date.now()}-Collection-${uuidv4()}${path.extname(req.file.originalname)}`;
        const processedImageBuffer = await sharp(req.file.buffer)
            .resize(800)
            .toFormat('webp')
            .toBuffer();

        const tempLocalFile = path.join(__dirname, '../images/collections', fileName);
        await fs.promises.writeFile(tempLocalFile, processedImageBuffer);

        await bucket.upload(tempLocalFile, {
            destination: `images/collections/${fileName}`,
            metadata: {
                contentType: 'image/webp',
            },
        });

        const [url] = await bucket.file(`images/collections/${fileName}`).getSignedUrl({
            action: 'read',
            expires: '03-09-2491',
        });

        await fs.promises.unlink(tempLocalFile);
        req.fileUrl = url;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

const uploadFileProductsToFirebase = async (req: RequestWithFileUrl, res: express.Response, next: express.NextFunction) => {
    if (!req.files || req.files.length === 0) {
        console.log('No files uploaded');
        req.fileUrls = [];
        return next();
    }

    try {
        const files = req.files as unknown as FileWithOriginalName[];
    

        const fileNames = files.map(file => `${uuidv4()}${path.extname(file.originalname)}`);
        const imagesUrls: string[] = [];

        await Promise.all(files.map(async (file, index) => {
            const filename = fileNames[index];
            const processedImageBuffer = await sharp(file.buffer)
                .resize(800)
                .toFormat('webp')
                .toBuffer();

            const tempLocalFile = path.join(__dirname, '../images/products', filename);
            await fs.promises.writeFile(tempLocalFile, processedImageBuffer);

            await bucket.upload(tempLocalFile, {
                destination: `images/products/${filename}`,
                metadata: {
                    contentType: 'image/webp',
                },
            });

            const [url] = await bucket.file(`images/products/${filename}`).getSignedUrl({
                action: 'read',
                expires: '03-09-2491',
            });

            await fs.promises.unlink(tempLocalFile);
            imagesUrls.push(url);
        }));

        req.fileUrls = imagesUrls;

        next();
    } catch (error) {
        console.error('Error uploading files to Firebase:', error);
        res.status(500).json({ message: 'Error uploading files' });
    }
};

const processImages = async (req: RequestWithFileUrl, res: express.Response, next: express.NextFunction) => {
    const maxWidth = 200; // HD max width
    const maxHeight = 200; // HD max height

    try {
        if (!req.files || req.files.length === 0) {
            return next(); // Continuar si no hay archivos para procesar
        }

        const files = req.files as unknown as FileWithOriginalName[];

        const tempFilePaths = files.map(file => path.join(__dirname, '../images/products', `${path.basename(file.originalname, path.extname(file.originalname))}-temp.webp`));

        await Promise.all(
            files.map(async (file, index) => {
                const tempFilePath = tempFilePaths[index];

                const processedImageBuffer = await sharp(file.buffer)
                    .resize({
                        fit: sharp.fit.inside,
                        width: maxWidth,
                        height: maxHeight,
                        withoutEnlargement: true
                    })
                    .toFormat('webp')
                    .toBuffer();

                await fs.promises.writeFile(tempFilePath, processedImageBuffer);

                const originalFilePath = path.join(__dirname, '../images/products', file.originalname);
                await fs.promises.rename(tempFilePath, originalFilePath);
            })
        );
        next();
    } catch (error) {
        console.error('Error processing images:', error);
        next(error);
    }
};

export { uploadFileCollectionsToFirebase, uploadFileProductsToFirebase, fileUpload, uploadFiles, uploadFileAvatarToFirebase, uploadAvatar, processImages };