import express from 'express'
import {addImage,findImageById,deleteImageById, updateImageUrl, displayGallery} from '../controllers/galleryController.mjs'
const router = express.Router();

router.post('/add', addImage)
router.get('/find/:imageId', findImageById);
router.delete('/delete/:imageId', deleteImageById);
router.put('/update', updateImageUrl);
router.get('/', displayGallery)

export default router;