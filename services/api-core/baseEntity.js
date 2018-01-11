
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class BaseEntity {

    constructor(configuration, entity){
        this.creator = new Creator(configuration);
        this.finder = new Finder(configuration);
        this.entity = entity;
    }

    destroy(obj){
        if (Array.isArray(obj)){
            var items = obj.map(o => {
                o._metadata = {
                    type: this.entity,
                    changeTrack:"destroy"
                };
            })
            return this.creator.create(items);
        }else{
            map._metadata = {
                type:this.entity,
                changeTrack:"destroy"
            };
            return this.creator.create([map]);
        }
    }
    create(map){
        if (Array.isArray(map)){
            var items = map.map(m => {
                m._metadata = {
                    type:this.entity,
                    changeTrack:"create"
                };
                return m;
            });
            return this.creator.create(items);
        }else{
            map._metadata = {
                type:this.entity,
                changeTrack:"create"
            };
            return this.creator.create([map]);
        }

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
                    fieldName : "systemId",
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
                    fieldName : "processId",
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