var Model = require("../core/model");
var Enumerable = require('linq');

const CHANGETRACK_CREATE = "create";
const CHANGETRACK_UPDATE = "update";
const CHANGETRACK_DELETE = "destroy";

module.exports = class DataSet {
    constructor(data) {
        this.index = {};
        this.entities = data;
        this.mountInterface();
    }
    mountInterface(){
        Object.keys(this.entities).forEach(type => {
            this[type] = {
                insert: this.insert.bind({
                    collection: this.entities,
                    type: type
                }),
                collection: Enumerable.from(this.entities[type]).where((item) => item._metadata.changeTrack != CHANGETRACK_DELETE),
                update: this.update.bind({}),
                delete: this.delete.bind({})
            };
        });
    }
    insert(entity) {
        if (!entity) {
            throw new Error("Entity not defined");
        }
        if (!this.collection[this.type]) {
            this.collection[this.type] = [];
        }
        entity._metadata = {
            type: this.type,
            changeTrack: CHANGETRACK_CREATE
        }
        if (entity.id){
            entity._metadata.changeTrack = CHANGETRACK_UPDATE;
        }
        var model = new Model(entity);
        this.collection[this.type].push(model);
        return model;
    }

    update(entity) {
        entity._metadata.changeTrack = CHANGETRACK_UPDATE;
    }

    // TODO tem um problema para ser validado que é o caso de consulta após remoção,
    // o item deveria continuar existindo?
    delete(entity) {
        entity._metadata.changeTrack = CHANGETRACK_DELETE;
    }
}