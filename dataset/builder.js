
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
        var dataset = this.buildEntityCollection(context);
        this.index(dataset);
        return new DataSet(dataset);
    }

    buildEntityCollection(context){
        var dataset = {};
        var _entities = Object.keys(context.map.content);
        _entities.forEach(e => {
            dataset[e] = [];
        });
        return dataset;
    }
}