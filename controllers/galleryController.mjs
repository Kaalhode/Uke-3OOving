import ImageGallery from '../models/imageGallery.mjs';
import HTTP_CODES from './utils/httpCodes.mjs';
const gallery = new ImageGallery();

export function addImage(req, res) {
    const { imageId, imageUrl } = req.body;
    if (!imageId || !imageUrl) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Image ID and Image URL are required');
    }
    gallery.addImage(imageId, imageUrl);
    res.status(HTTP_CODES.SUCCESS.CREATED).send('Image added successfully');
}

export function findImageById(req, res) {
    const { imageId } = req.params;
    if (!imageId) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Image ID is required');
    }
    const image = gallery.findImageById(imageId);
    if (image) {
        res.status(HTTP_CODES.SUCCESS.OK).json(image);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Image not found');
    }
}

export function deleteImageById(req, res) {
    const { imageId } = req.params;
    if (!imageId) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Image ID is required');
    }
    gallery.deleteImageById(imageId);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image deleted successfully');
}

export function updateImageUrl(req, res) {
    const { imageId, newImageUrl } = req.body;
    if (!imageId || !newImageUrl) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send('Image ID and new Image URL are required');
    }
    gallery.updateImageUrl(imageId, newImageUrl);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image URL updated successfully');
}

export function displayGallery(req, res) {
    const images = gallery.displayGallery();
    res.status(HTTP_CODES.SUCCESS.OK).json(images);
}