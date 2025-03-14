import GalleryManager from '../models/galleryManager.mjs';
import HTTP_CODES from '../utils/httpCodes.mjs';

const galleryManager = new GalleryManager();

export async function createGallery(req, res) {
    const { name, description } = req.body;

    try {
        const gallery = await galleryManager.createGallery(name, description);
        res.status(HTTP_CODES.SUCCESS.CREATED).json(gallery);
    } catch (error) {
        console.error("Error creating gallery:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to create gallery." });
    }
}

export async function addImage(req, res) {
    const { galleryId } = req.params;
    const { url } = req.body;

    try {
        const addedImage = await galleryManager.addImage(parseInt(galleryId, 10), url);
        res.status(HTTP_CODES.SUCCESS.CREATED).json({ message: "Image uploaded successfully.", image: addedImage });
    } catch (error) {
        console.error("Error in addImage controller:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to upload image." });
    }
}

export async function fetchGalleries(req, res) {
    try {
        const galleries = await galleryManager.fetchGalleries();
        res.status(HTTP_CODES.SUCCESS.OK).json(galleries);
    } catch (error) {
        console.error("Error fetching galleries:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch galleries." });
    }
}

export async function listGallery(req, res) {
    const { galleryId } = req.params;

    try {
        if (!galleryId) {
            return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Gallery ID is required." });
        }

        const gallery = await galleryManager.listGallery(parseInt(galleryId, 10));
        res.status(HTTP_CODES.SUCCESS.OK).json(gallery);
    } catch (error) {
        console.error("Error listing gallery:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to list gallery." });
    }
}

export async function listImagesInGallery(req, res) {
    const { galleryId } = req.params;

    try {
        if (!galleryId) {
            return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Gallery ID is required." });
        }

        const images = await galleryManager.listImagesInGallery(parseInt(galleryId, 10));
        res.status(HTTP_CODES.SUCCESS.OK).json(images);
    } catch (error) {
        console.error("Error listing images:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch images for the gallery." });
    }
}


export async function deleteGallery(req, res) {
    const {galleryId} = req.params;

    try {
        const result = await galleryManager.deleteGallery(galleryId);
        res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Gallery deleted successfully", result });
    } catch (error) {
        console.error("Error deleting gallery:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete gallery." });
    }
}

export async function deleteImage(req, res) {
    const { galleryId, imageId } = req.params;

    try {
        if (!galleryId || !imageId) {
            return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Gallery ID and Image ID are required." });
        }

        const wasDeleted = await galleryManager.deleteImage(galleryId, imageId);

        if (wasDeleted) {
            return res.status(HTTP_CODES.SUCCESS.OK).json({ message: "Image deleted successfully." });
        } else {
            return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "Image not found or already deleted." });
        }
    } catch (error) {
        console.error("Error deleting image:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete image." });
    }
}

export async function updateImageLink(req, res) {
    const { imageId } = req.params;
    const { newUrl } = req.body;

    try {
        if (!imageId || !newUrl) {
            return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).json({ error: "Image ID and new URL are required." });
        }

        const updatedImage = await galleryManager.updateImageLink(parseInt(imageId, 10), newUrl);
        if (!updatedImage) {
            return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).json({ error: "Image not found." });
        }

        res.status(HTTP_CODES.SUCCESS.OK).json(updatedImage);
    } catch (error) {
        console.error("Error updating image link:", error.message);
        res.status(HTTP_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({ error: "Failed to update image link." });
    }
}