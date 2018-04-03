/**
 * @class DataSetBuilder
 * @description Esta classe e responsavel por montar um dataset
 * baseado nos dados que vieram da aplicação de dominio
 */
const DataSet = require("./dataset");
const Model = require("../core/model");
module.exports = class DataSetBuilder {
    constructor(data, domainClient) {
        if (!data) {
            throw new Error("Domain data should be defined");
        }
        this.referenceIndex = {};
        this.data = data;
        this.domainClient = domainClient;
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
        return new Promise((resolve, reject) => {
            try {
                var keys = Object.keys(context.event.payload);
                var entities = keys.filter(k => this.isValidEntity(k, context.event.payload)).map(k => context.event.payload[k]);
                var toExclude = keys.filter(k => this.isInvalidEntity(k, context.event.payload));
                toExclude.forEach(i => delete context.event.payload[i]);
                var promises = entities.map(entity => this.bindEntity(context, dataset, entity.id, entity._metadata.type));
                Promise.all(promises).then(result => {
                    console.log(keys);
                    console.log(entities);
                    console.log(result);
                    resolve(dataset);
                }).catch(reject);
            } catch (e) {
                reject(e);
            }
        });
    }

    bindEntity(context, dataset, id, type) {
        return new Promise((res, reject) => {
            var map = context.map.name;
            var filter = "byId";
            this.domainClient.findById(map, type, id).then(entity => {
                if (entity === null) {
                    reject(new Error(`Object ${type} from map ${map} with id ${id} not found on domain`));
                } else {
                    console.log(entity);
                    resolve(entity);
                }
            });
        });
    }

    isValidEntity(k, _obj) {
        var obj = _obj[k];
        if (obj && obj["id"] && obj["_metadata"] && obj["_metadata"]["type"]) {
            return true;
        } else {
            return false;
        }
    }

    isInvalidEntity(k, _obj) {
        var obj = _obj[k];
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