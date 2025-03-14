import GalleryStore from "../data/graphRecordStore.mjs";

class GalleryManager {
    constructor() {
        this.store = new GalleryStore();
    }

    async createGallery(name, description) {
        if (!name) {
            throw new Error("Gallery name is required.");
        }
        return await this.store.create({ name, description });
    }

    async listGallery(galleryId) {
        if (!galleryId) {
            throw new Error("Gallery ID is required.");
        }

        const gallery = await this.store.read({ galleryId });
        if (!gallery || gallery.length === 0) {
            throw new Error(`Gallery with ID '${galleryId}' not found.`);
        }

        return gallery[0];
    }
    async readGallery(galleryId) {
        if (!galleryId) {
            throw new Error("Gallery ID is required.");
        }
        return await this.store.read({ galleryId });
    }
    async fetchGalleries() {
        return await this.store.read();
    }
    
    async deleteGallery(galleryId) {
        if (!galleryId) {
            throw new Error("Gallery ID is required.");
        }
        return await this.store.purge({galleryId});
    }

    async deleteImage(galleryId, imageId) {
        if (!galleryId || !imageId) {
            throw new Error("Gallery ID and Image ID are required.");
        }
    
        const wasDeleted = await this.store.purge({ galleryId, imageId });
        //console.log("Image deleted successfully:", wasDeleted); 
        return wasDeleted; 
    }
    
    async addImage(galleryId, imageUrl) {
        if (!galleryId || !imageUrl) {
            throw new Error("Gallery ID and image URL are required.");
        }
    
        const addedImage = await this.store.addImage(galleryId, imageUrl);
        return addedImage; 
    }
    
    
    async readImage(imageId) {
        if (!imageId) {
            throw new Error("Image ID is required.");
        }
        return await this.store.read({ imageId });
    }
    async updateImageLink(imageId, newUrl) {
        if (!imageId || !newUrl) {
            throw new Error("Image ID and new URL are required.");
        }
        return await this.store.updateImageLink(imageId, newUrl);
    }
    async listImagesInGallery(galleryId) {
        if (!galleryId) {
            throw new Error("Gallery ID is required.");
        }
        return await this.store.read({ galleryId });
    }
    
}

export default GalleryManager;
