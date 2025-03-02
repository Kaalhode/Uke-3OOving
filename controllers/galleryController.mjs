import GalleryManager from '../models/galleryManager.mjs';
import HTTP_CODES from '../utils/httpCodes.mjs';

const galleryManager = new GalleryManager();

export function createGallery(req, res) {
    const { galleryId } = req.body;
    if (!galleryId) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Gallery ID is required');
    }

    const created = galleryManager.createGallery(galleryId);
    if (created) {
        res.status(HTTP_CODES.SUCCESS.CREATED).send(`Gallery '${galleryId}' created successfully`);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Gallery ID already exists');
    }
}

export function addImage(req, res) {
    console.log("Received request to add image:", req.body);

    const { galleryId, imageId, imageUrl } = req.body;

    if (!galleryId || !imageId || !imageUrl) {
        console.log("Missing required fields");
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Gallery ID, Image ID, and Image URL are required');
    }

    console.log(`Looking for gallery with ID: ${galleryId}`);
    const gallery = galleryManager.getGallery(galleryId);

    if (!gallery) {
        console.log("Gallery not found:", galleryId);
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Gallery not found');
    }

    console.log("Gallery before adding image:", gallery.displayGallery());

    console.log(`Gallery found. Adding image: ${imageId}`);
    gallery.addImage(imageId, imageUrl);

    console.log("Gallery after adding image:", gallery.displayGallery());

    console.log("Saving gallery after adding image...");
    galleryManager.saveGallery(galleryId, gallery);

    console.log("Image added successfully:", { imageId, imageUrl });
    res.status(HTTP_CODES.SUCCESS.CREATED).send('Image added successfully');
}


export function findImageById(req, res) {
    const { galleryId, imageId } = req.params;
    if (!galleryId || !imageId) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Gallery ID and Image ID are required');
    }

    const gallery = galleryManager.getGallery(galleryId);
    if (!gallery) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Gallery not found');
    }

    const image = gallery.findImageById(imageId);
    if (image) {
        res.status(HTTP_CODES.SUCCESS.OK).json(image);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Image not found');
    }
}

export function deleteImageById(req, res) {
    const { galleryId, imageId } = req.params;
    const success = galleryManager.deleteImageById(galleryId, imageId);
    if (success) {
        res.status(HTTP_CODES.SUCCESS.OK).send('Image deleted successfully');
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Gallery or Image not found');
    }
}

export function updateImageUrl(req, res) {
    const { galleryId, imageId, newImageUrl } = req.body;
    if (!galleryId || !imageId || !newImageUrl) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Gallery ID, Image ID, and new Image URL are required');
    }

    const success = galleryManager.updateImageUrl(galleryId, imageId, newImageUrl);
    if (success) {
        res.status(HTTP_CODES.SUCCESS.OK).send('Image URL updated successfully');
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Gallery or Image not found');
    }
}

export function displayGallery(req, res) {
    const { galleryId } = req.params;
    const images = galleryManager.displayGallery(galleryId);
    if (images) {
        res.status(HTTP_CODES.SUCCESS.OK).json(images);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Gallery not found');
    }
}

export function deleteGallery(req, res) {
    const { galleryId } = req.params;
    const deleted = galleryManager.deleteGallery(galleryId);
    if (deleted) {
        res.status(HTTP_CODES.SUCCESS.OK).send('Gallery deleted successfully');
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Gallery not found');
    }
}

export function listGalleries(req, res) {
    res.status(HTTP_CODES.SUCCESS.OK).json(galleryManager.listGalleries());
}
