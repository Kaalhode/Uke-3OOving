import ImageGallery from '../models/imageGallery.mjs';
import HTTP_CODES from './utils/httpCodes.mjs';
const gallery = new ImageGallery();

export function addImage(req, res) {
    const { imageId, imageUrl } = req.body;
    gallery.addImage(imageId, imageUrl);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image added successfully');
};

export function findImageById(req, res) {
    const imageId = req.params.imageId;
    const image = gallery.findImageById(imageId);
    if(image){
        res.status(HTTP_CODES.SUCCESS.OK).json(image);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Image not found');
    }
};

export function deleteImageById(req, res){
    const imageId = req.params.imageId;
    gallery.deleteImageById(imageId);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image deleted sucessfully');
};

export function updateImageUrl(req,res){
    const { imageId, newImageUrl } = req.body;
    gallery.updateImageUrl(imageId, newImageUrl);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image Url updated sucessfully');
};

export function displayGallery(req,res){
    const images = gallery.displayGallery();
    res.status(HTTP_CODES.SUCCESS.OK).json(images);
}