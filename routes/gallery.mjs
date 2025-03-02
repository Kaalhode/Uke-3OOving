import express from 'express'
import {createGallery,addImage,findImageById,deleteImageById, updateImageUrl, displayGallery, deleteGallery,listGalleries} from '../controllers/galleryController.mjs'
const router = express.Router();


router.post('/create', createGallery);
router.get('/list', listGalleries);
router.delete('/delete/:galleryId', deleteGallery);
router.post('/:galleryId/add', addImage);
router.get('/:galleryId/find/:imageId', findImageById);
router.delete('/:galleryId/delete/:imageId', deleteImageById);
router.put('/:galleryId/update', updateImageUrl);
router.get('/:galleryId', displayGallery);

export default router;