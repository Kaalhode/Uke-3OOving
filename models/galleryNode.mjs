import GalleryStore from "./data/graphRecordStore.mjs";

const storageHandler = new ItemStore();

class GalleryNode {
    constructor(id = null, gallery) {
        this.id = id;
        this.gallery = gallery;
    }

    async create() {
        const item = await storageHandler.create({
            id: this.id,
            data: JSON.stringify(this.gallery),
            connections: this.gallery.images.map(img => img.imageId)
        });
        this.id = item.id;
        return this;
    }

    async read() {
        const item = await storageHandler.read({ id: this.id });
        this.id = item.id;
        this.gallery = JSON.parse(item.data);
        return this;
    }

    async update() {
        const item = await storageHandler.update({
            id: this.id,
            data: JSON.stringify(this.gallery),
            connections: this.gallery.images.map(img => img.imageId)
        });
        this.id = item.id;
        return this;
    }

    async purge() {
        await storageHandler.purge({ id: this.id });
        return null;
    }
}

export default GalleryNode;
