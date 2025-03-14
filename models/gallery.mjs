class Gallery {
    constructor(galleryId) {
        this.galleryId = galleryId; 
        this.images = []; 
    }

    addImage(image) {
        this.images.push(image);
    }

    removeImageById(imageId) {
        this.images = this.images.filter(image => image.imageId !== imageId); 
    }
}

export default Gallery;
