class ImageManager {
    manageImages(textImages: string | string[], fileImages: File[] | string[]): string {
        // Inicializa `images` como un string vacío
        let images = '';

        // Convierte `fileImages` en una cadena, si hay imágenes
        const fileImagesStr = fileImages.length > 0
            ? fileImages.map(file => file instanceof File ? file.name : file).join(',')
            : '';

        // Convierte `textImages` en una cadena, si es un array
        const textImagesStr = Array.isArray(textImages) ? textImages.join(',') : textImages || '';

        // Construye la cadena final de imágenes
        if (fileImagesStr && textImagesStr) {
            images = `${fileImagesStr},${textImagesStr}`;
        } else {
            images = fileImagesStr || textImagesStr;
        }

        return images;
    }

    manageImage(req: { fileUrl?: string, body: { avatarText?: string } }): string | null {
        if (req.fileUrl) {
            return req.fileUrl;
        } else if (req.body.avatarText) {
            return req.body.avatarText;
        } else {
            return null;
        }
    }


}

export default ImageManager;