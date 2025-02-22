import ImageGallery from '../models/imageGallery.mjs';
import HTTP_CODES from './utils/httpCodes.mjs';
const gallery = new ImageGallery();

function addImage(req, res) {
    const { imageId, imageUrl } = req.body;
    gallery.addImage(imageId, imageUrl);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image added successfully');
};

function findImageById(req, res) {
    const imageId = req.params.imageId;
    const image = gallery.findImageById(imageId);
    if(image){
        res.status(HTTP_CODES.SUCCESS.OK).json(image);
    } else {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send('Image not found');
    }
}

/*deleteImageById
updateImageUrl
displayGallery
*/