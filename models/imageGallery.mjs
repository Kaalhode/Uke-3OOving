import ImageNode from './imageNode.mjs'

class ImageGallery {
    constructor() {
        this.head = null;
    }
    
    addImage(imageId, imageURL){
        const newNode = new ImageNode(imageId, imageURL);
        if(!this.head){
            this.head = newNode
        } else{
            let current = this.head;
            while(current.next){
                current = current.next
            }
            current.next = newNode
        }
    }
    findImageById(imageId) {
        let current = this.head;
        while (current) {
            if (current.imageId === imageId) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    deleteImageById(imageId) {
        if (!this.head) {
            return;
        }

        if (this.head.imageId === imageId) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.imageId === imageId) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
    updateImageUrl(imageId, newImageUrl) {
        let current = this.head;
        while (current) {
            if (current.imageId === imageId) {
                current.imageUrl = newImageUrl;
                return;
            }
            current = current.next;
        }
    }
    displayGallery() {
        let current = this.head;
        const images = [];
        while (current) {
            images.push({ imageId: current.imageId, imageUrl: current.imageUrl });
            current = current.next;
        }
        return images;
    }
}

export default ImageGallery