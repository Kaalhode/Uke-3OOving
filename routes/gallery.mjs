import express from "express";
import {createGallery,addImage,fetchGalleries,listGallery,listImagesInGallery,deleteGallery,deleteImage, updateImageLink} from "../controllers/galleryController.mjs";

const router = express.Router();

router.post("/galleries", createGallery);
router.get("/galleries", fetchGalleries)
router.get("/galleries/:galleryId/images", listImagesInGallery); 
router.post('/galleries/:galleryId/images', addImage);
router.delete("/galleries/:galleryId", deleteGallery);
router.delete("/galleries/:galleryId/images/:imageId", deleteImage);
router.patch('/galleries/:galleryId/images/:imageId', updateImageLink);
router.get("/galleries/:galleryId", listGallery);

export default router;
