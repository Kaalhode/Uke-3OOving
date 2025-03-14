import DbManager from "./db.mjs";
import RecordStoreAbstractInterface from "./recordStoreInterface.mjs";

class GalleryStore extends RecordStoreAbstractInterface {

    async create(item) {
        const sql = `INSERT INTO galleries (name, description) 
                     VALUES ($1, $2) RETURNING id, name, description, created_at, updated_at;`;
        const params = [item.name, item.description];
        return await DbManager.create(sql, ...params);
    }

    async read(criteria) {
        if (criteria && criteria.galleryId) {
            const sql = `SELECT id, url, description, created_at, updated_at 
                         FROM images 
                         WHERE gallery_id = $1;`;
            const params = [criteria.galleryId];
            return await DbManager.read(sql, ...params);
            
        } else if (!criteria) {
            const sql = `SELECT id, name, description, created_at, updated_at 
                         FROM galleries;`;
            return await DbManager.read(sql);
        } else {
            throw new Error("Invalid criteria for fetching data.");
        }
    }
    
    

    async update(item) {
        const sql = `UPDATE galleries SET name = $1, description = $2, updated_at = NOW() 
                     WHERE id = $3 RETURNING id, name, description, updated_at;`;
        const params = [item.name, item.description, item.id];
        return await DbManager.update(sql, ...params);
    }

    async purge(criteria) {
        if (criteria.imageId && criteria.galleryId) {

            const sql = `DELETE FROM images WHERE id = $1 AND gallery_id = $2 RETURNING id;`;
            const params = [criteria.imageId, criteria.galleryId];
            const result = await DbManager.purge(sql, ...params);
    
            console.log("Image Deletion Result:", result); 
    
            if (result && Array.isArray(result) && result.length > 0) {
                return true;
            } else {
                return false;
            }
        } else if (criteria.galleryId) {
            const deleteImagesSql = `DELETE FROM images WHERE gallery_id = $1;`;
            const deleteImagesParams = [criteria.galleryId];
            const deleteImagesResult = await DbManager.purge(deleteImagesSql, ...deleteImagesParams);
    
            const deleteGallerySql = `DELETE FROM galleries WHERE id = $1 RETURNING id;`;
            const deleteGalleryParams = [criteria.galleryId];
            const deleteGalleryResult = await DbManager.purge(deleteGallerySql, ...deleteGalleryParams);
    
            return deleteGalleryResult.rowCount > 0;
        } else {
            throw new Error("Invalid criteria: either 'galleryId' or both 'galleryId' and 'imageId' are required.");
        }
    }

    async fetch() {
        const sql = `SELECT * FROM galleries;`;
        return await DbManager.read(sql);
    }

    async customQuery(query, ...params) {
        return await DbManager.runQuery(query, ...params);
    }

    async addImage(galleryId, imageUrl) {
        const sql = `INSERT INTO images (gallery_id, url) VALUES ($1, $2) RETURNING id, gallery_id, url;`;
        const params = [galleryId, imageUrl];
    
        try {
            const result = await DbManager.create(sql, ...params);
            console.log("Add Image Query Result:", result);
    
        } catch (error) {
            console.error("Error adding image:", error.message);
            throw error;
        }
    }
    
    
    
    
    async fetchGalleryImages(galleryId) {
        const sql = `SELECT * FROM images WHERE gallery_id = $1;`;
        const params = [galleryId];
        return await DbManager.read(sql, ...params);
    }
    async updateImageLink(imageId, newUrl) {
        const sql = `UPDATE images SET url = $1, updated_at = NOW() WHERE id = $2 RETURNING id, gallery_id, url, description, updated_at;`;
        const params = [newUrl, imageId];
        return await DbManager.update(sql, ...params);
    }
    async galleryExists(galleryId) {
        const sql = `SELECT id FROM galleries WHERE id = $1;`;
        const params = [galleryId];
        const result = await DbManager.read(sql, ...params);
    
        console.log("Gallery Exists Query Result:", result);
    
        return result.rowCount > 0;
    }
    
    async galleryExists(galleryId) {
        const sql = `SELECT id FROM galleries WHERE id = $1;`;
        const params = [galleryId];
        const result = await DbManager.read(sql, ...params);
    
        console.log("Checking if gallery exists for ID:", galleryId);
        console.log("Query Result:", result);
    
        // Use result.rows.length instead of result.rowCount
        return result.rows && result.rows.length > 0;
    }
    
}

export default GalleryStore;
