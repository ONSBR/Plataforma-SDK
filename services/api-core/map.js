
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class Map {

    constructor(configuration){
        this.creator = new Creator(configuration);
        this.finder = new Finder(configuration);
    }

    create(map){
        map._metadata = {
            type:"map",
            changeTrack:"create"
        };
        return this.creator.create([map]);
    }

    findByName(name) {
        var criteria = {
            filterName : "byName",
            fieldName : "name",
            fieldValue : name
        }
        return this.finder.find('map', criteria);
    }

    findBySystemId(id) {
        var criteria = {
            filterName : "bySystemId",
            fieldName : "id",
            fieldValue : id
        }
        return this.finder.find('map', criteria);
    }

    findByProcessId(id) {
        var criteria = {
            filterName : "byProcessId",
            fieldName : "id",
            fieldValue : id
        }
        return this.finder.find('map', criteria);
    }

    findById(id) {
        var criteria = {
            filterName : "byId",
            fieldName : "id",
            fieldValue : id
        }
        return this.finder.find('map', criteria, 1)
    }

}