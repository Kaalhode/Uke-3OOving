import fs from 'fs';
import path from 'path';
import ImageGallery from './imageGallery.mjs';

const GALLERIES_DIR = './galleries';

class GalleryManager {
    constructor() {
        this.galleries = new Map();
        this.loadGalleries(); 
    }

    ensureGalleriesFolder() {
        if (!fs.existsSync(GALLERIES_DIR)) {
            fs.mkdirSync(GALLERIES_DIR);
        }
    }

    loadGalleries() {
        this.ensureGalleriesFolder();
        const files = fs.readdirSync(GALLERIES_DIR);
        files.forEach(file => {
            if (file.endsWith('.json')) {
                const galleryId = file.replace('.json', '');
                const data = JSON.parse(fs.readFileSync(path.join(GALLERIES_DIR, file), 'utf-8'));
                const gallery = new ImageGallery();
                data.forEach(img => gallery.addImage(img.imageId, img.imageUrl));
                this.galleries.set(galleryId, gallery);
            }
        });
    }

    saveGallery(galleryId) {
        this.ensureGalleriesFolder();
        const gallery = this.galleries.get(galleryId);
        if (gallery) {
            const data = gallery.displayGallery();
            fs.writeFileSync(path.join(GALLERIES_DIR, `${galleryId}.json`), JSON.stringify(data, null, 2));
        }
    }

    createGallery(galleryId) {
        if (this.galleries.has(galleryId)) {
            return false; // Gallery already exists
        }
        this.galleries.set(galleryId, new ImageGallery());
        this.saveGallery(galleryId);
        return true;
    }

    getGallery(galleryId) {
        return this.galleries.get(galleryId) || null;
    }

    deleteGallery(galleryId) {
        if (this.galleries.delete(galleryId)) {
            fs.unlinkSync(path.join(GALLERIES_DIR, `${galleryId}.json`)); // Delete file
            return true;
        }
        return false;
    }

    listGalleries() {
        return Array.from(this.galleries.keys());
    }

    addImage(galleryId, imageId, imageUrl) {
        const gallery = this.getGallery(galleryId);
        if (!gallery) return false;
        gallery.addImage(imageId, imageUrl);
        this.saveGallery(galleryId);
        return true;
    }

    deleteImageById(galleryId, imageId) {
        const gallery = this.getGallery(galleryId);
        if (!gallery) return false;
        gallery.deleteImageById(imageId);
        this.saveGallery(galleryId);
        return true;
    }

    updateImageUrl(galleryId, imageId, newImageUrl) {
        const gallery = this.getGallery(galleryId);
        if (!gallery) return false;
        gallery.updateImageUrl(imageId, newImageUrl);
        this.saveGallery(galleryId);
        return true;
    }

    displayGallery(galleryId) {
        const gallery = this.getGallery(galleryId);
        return gallery ? gallery.displayGallery() : null;
    }
}

export default GalleryManager;
