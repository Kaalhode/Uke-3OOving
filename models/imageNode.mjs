class ImageNode {
    constructor(imageId, imageUrl) {
        this.imageId = imageId;
        this.imageUrl = imageUrl;
        this.next = null;
    }
}

export default ImageNode;