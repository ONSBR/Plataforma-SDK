
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class BaseEntity {

    constructor(configuration, entity){
        this.creator = new Creator(configuration);
        this.finder = new Finder(configuration);
        this.entity = entity;
    }

    create(map){
        map._metadata = {
            type:this.entity,
            changeTrack:"create"
        };
        return this.creator.create([map]);
    }

    findByName(name) {
        var criteria = {
            filterName : "byName",
            parameters:
            [
                {
                    fieldName : "name",
                    fieldValue : name
                }
            ]
        }
        return this.finder.find(this.entity, criteria);
    }

    findBySystemId(id) {
        var criteria = {
            filterName : "bySystemId",
            parameters:
            [
                {
                    fieldName : "id",
                    fieldValue : id
                }
            ]
        }
        return this.finder.find(this.entity, criteria);
    }

    findByProcessId(id) {
        var criteria = {
            filterName : "byProcessId",
            parameters:
            [
                {
                    fieldName : "id",
                    fieldValue : id
                }
            ]
        }
        return this.finder.find(this.entity, criteria);
    }

    findById(id) {
        var criteria = {
            filterName : "byId",
            parameters:
            [
                {
                    fieldName : "id",
                    fieldValue : id
                }
            ]
        }
        return this.finder.find(this.entity, criteria, 1)
    }


}