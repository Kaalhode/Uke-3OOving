import ImageGallery from '../models/imageGallery.mjs';
import HTTP_CODES from './utils/httpCodes.mjs';
const gallery = new ImageGallery();

function addImage(req, res) {
    const { imageId, imageUrl } = req.body;
    gallery.addImage(imageId, imageUrl);
    res.status(HTTP_CODES.SUCCESS.OK).send('Image added successfully');
};