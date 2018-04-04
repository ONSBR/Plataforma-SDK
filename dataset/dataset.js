var Model = require("../core/model");
var Enumerable = require('linq');

const CHANGETRACK_CREATE = "create";
const CHANGETRACK_UPDATE = "update";
const CHANGETRACK_DELETE = "destroy";

module.exports = class DataSet {
    constructor(data) {
        if (data && !data.entities) {
            this.mountInterface(data);
            this.entities = data;
        } else if (data && data.entities) {
            this.entities = data.entities;
            this.mountInterface(data.entities);
        } else {
            throw new Error(`Data is required`);
        }
    }
    mountInterface(data) {
        Object.keys(data).forEach(type => {
            this[type] = {
                insert: this.insert.bind({
                    collection: data,
                    type: type
                }),
                collection: Enumerable.from(data[type]).where((item) => item._metadata.changeTrack != CHANGETRACK_DELETE),
                update: this.update.bind({
                    collection: data,
                    type: type
                }),
                delete: this.delete.bind({
                    collection: data,
                    type: type
                }),
                bind: this.bind.bind({
                    collection: data,
                    type: type
                })
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

        var model = new Model(entity);
        this.collection[this.type].push(model);
        return model;
    }

    bind(entity) {
        if (!entity) {
            throw new Error("Entity not defined");
        }
        if (!this.collection[this.type]) {
            this.collection[this.type] = [];
        }
        var model = new Model(entity);

        var exist = this.collection[this.type].filter(o => o.id === entity.id).length > 0;
        if (!exist){
            this.collection[this.type].push(model);
        }
        return model;
    }

    trackingList(instanceId) {
        var list = [];
        Object.keys(this.entities).forEach(k => {
            this.entities[k].forEach(item => {
                if (item._metadata && item._metadata.changeTrack
                    && (item._metadata.changeTrack == CHANGETRACK_CREATE
                        || item._metadata.changeTrack == CHANGETRACK_UPDATE
                        || item._metadata.changeTrack == CHANGETRACK_DELETE)) {

                    list.push(item);
                }
            });
        });
        return list;
    }

    flatList() {
        var list = [];
        Object.keys(this.entities).forEach(k => {
            this.entities[k].forEach(item => {
                list.push(item);
            });
        });
        return list;
    }

    update(entity) {
        entity._metadata.changeTrack = CHANGETRACK_UPDATE;
    }

    // TODO tem um problema para ser validado que é o caso de consulta após remoção,
    // o item deveria continuar existindo?
    delete(entity) {
        var obj = this.collection.filter(o => o.id === entity.id)[0];
        if (obj){
            obj._metadata.changeTrack = CHANGETRACK_DELETE;
        }else{
            throw new Error(`Object ${entity.id} not found on dataset`);
        }
    }
}