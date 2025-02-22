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
    /*
    findImageById
    deleteImageById
    updateImageUrl
    displayGallery
    */
}