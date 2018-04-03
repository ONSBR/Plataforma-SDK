/**
 * @class DataSetBuilder
 * @description Esta classe e responsavel por montar um dataset
 * baseado nos dados que vieram da aplicação de dominio
 */
const DataSet = require("./dataset");
const Model = require("../core/model");
module.exports = class DataSetBuilder {
    constructor(data) {
        if (!data) {
            throw new Error("Domain data should be defined");
        }
        this.referenceIndex = {};
        this.data = data;
    }


    index(dataset) {
        var referenceIndex = {};
        this.data.forEach(collection => {
            collection.forEach(item => {
                var type = item._metadata.type;
                if (!dataset[type]) {
                    dataset[type] = [];
                }
                if (!referenceIndex[item.id]) {
                    referenceIndex[item.id] = new Model(item);
                }
                dataset[type].push(referenceIndex[item.id]);
            });
        });
    }

    build(context) {
        return new Promise((resolve) => {
            var dataset = this.buildEntityCollection(context);
            this.index(dataset);
            this.bindEntities(dataset, context)
                .then((dataset) => resolve(new DataSet(dataset)));
        });
    }

    bindEntities(dataset, context) {
        return new Promise((resolve) => {
            var keys = Object.keys(context.event.payload);
            var entities = keys.filter(this.isValidEntity);
            var toExclude = keys.filter(this.isInvalidEntity);
            toExclude.forEach(i => delete context.event.payload[i]);
            var promises = entities.map(entity => this.bindEntity(entity.id, entity.type));
            Promise.all(promises).then(result => {
                console.log(keys);
                console.log(entities);
                console.log(result);
                resolve(dataset);
            });
        });
    }

    bindEntity(id, type){
        return new Promise((res)=>{
            res(id);
        });
    }

    isValidEntity(obj) {
        if (obj && obj["id"] && obj["_metadata"] && obj["_metadata"]["type"]) {
            return true;
        } else {
            return false;
        }
    }

    isInvalidEntity(obj) {
        return obj && obj["id"] && !obj["_metadata"];
    }

    buildEntityCollection(context) {
        var dataset = {};
        var _entities = Object.keys(context.map.content);
        _entities.forEach(e => {
            dataset[e] = [];
        });
        return dataset;
    }
}