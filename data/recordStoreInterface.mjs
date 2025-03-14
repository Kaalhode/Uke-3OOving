class RecordStoreAbstractInterface {
    create(item) {
        throw new Error("Method 'create' must be implemented.");
    }
    read(item) {
        throw new Error("Method 'read' must be implemented.");
    }
    update(item) {
        throw new Error("Method 'update' must be implemented.");
    }
    purge(item) {
        throw new Error("Method 'purge' must be implemented.");
    }
    customQuery(query, ...params) {
        throw new Error("Method 'customQuery' must be implemented.");
    }
}
export default RecordStoreAbstractInterface;
