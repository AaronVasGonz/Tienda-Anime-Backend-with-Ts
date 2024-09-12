

import fs from 'fs';
import admin from 'firebase-admin';

const bucket = admin.storage().bucket();

const deleteFilePath = (fileNamePath: string) => {
    if (fileNamePath) {
        fs.unlink(fileNamePath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
            } else {
                //console.log('Archivo eliminado correctamente');
            }
        });
    } else {
        console.log('No se cargó ningún archivo');
    }
}

const deleteFileFromFirebase = async (fireBaseURL: string|null, filePath: string) => {
    if (!fireBaseURL) {
        return;
    }
    try {
        const fileName = fireBaseURL.split(`/images/${filePath}/`)[1].split('?')[0];

        //create a reference to the file to delete
        const file = bucket.file(`images/${filePath}/${fileName}`);

        await file.delete();

    } catch (error) {
        console.log(error);
    }
};

const deleteFilesFromFirebase = async (fireBaseURLS: string[], filePath: string) => {
    if (!fireBaseURLS) {
        return;
    }
    try {
        for (const fireBaseURL of fireBaseURLS) {
            const fileName = fireBaseURL.split(`/images/${filePath}/`)[1].split('?')[0];

            const file = bucket.file(`images/${filePath}/${fileName}`);

            await file.delete();
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteMultipleFiles = (filePaths: string[]) => {
    filePaths.forEach(filePath => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
            } else {
                //console.log('Archivo eliminado correctamente');
            }
        });
    });
}

const manageImages = (textImages: string | string[] | undefined, fileImages: string[]): string => {
    let images: string = '';
    if (fileImages.length === 0) {
          images = Array.isArray(textImages) ? textImages.join(',') : textImages || '';
        
    } else if (textImages === undefined) {

        images = fileImages.map(file => file).join(',');
    }
    else if (Array.isArray(textImages) && textImages.length > 1) {

        const images1 = fileImages.map(file => file).join(',');

        const images2 = textImages.join(',');

        images = `${images1},${images2}`;

    } else {

        const images1 = fileImages.map(file => file).join(',');

        const images2 = textImages;

        images = `${images1},${images2}`;

    }

    return images;
}

export { deleteFilePath, deleteFileFromFirebase, deleteFilesFromFirebase, deleteMultipleFiles, manageImages };


