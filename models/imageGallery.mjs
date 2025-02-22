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

    /*
    deleteImageById
    updateImageUrl
    displayGallery
    */
}