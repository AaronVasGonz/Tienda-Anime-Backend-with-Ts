import { bucket } from '../config/firebaseConfig';

class StorageService {

    async deleteFileFromFirebase(fireBaseURL: string | null, filePath: string) {
        if (!fireBaseURL || !filePath) {
            console.error('Invalid parameters: fireBaseURL and filePath are required.');
            return;
        }

        try {
            // Extract file name from the URL
            const fileName = fireBaseURL.split(`/images/${filePath}/`)[1].split('?')[0];

            // Create a reference to the file to delete
            const file = bucket.file(`images/${filePath}/${fileName}`);

            // Delete the file
            await file.delete();

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting file: ${error.message}`);
            } else {
                throw new Error(`Error while deleting file: ${String(error)}`);
            }
        }
    }

    async deleteFilesFromFirebase(fireBaseURLS: string[], filePath: string) {
        if (!fireBaseURLS || !filePath) {
            throw new Error('Invalid parameters: fireBaseURLS and filePath are required.');
        }

        try {
            // Create an array of promises to delete files
            const deletePromises = fireBaseURLS.map(async (fireBaseURL) => {
                const fileName = fireBaseURL.split(`/images/${filePath}/`)[1].split('?')[0];
                const file = bucket.file(`images/${filePath}/${fileName}`);
                await file.delete();
                console.log(`File ${fileName} deleted successfully.`);
            });

            // Execute all delete operations in parallel
            await Promise.all(deletePromises);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error while deleting files: ${error.message}`);
            } else {
                throw new Error(`Error while deleting files: ${String(error)}`);
            }
        }
    }
}

export default StorageService;