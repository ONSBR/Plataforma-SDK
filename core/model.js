const Utils = require("../utils");
module.exports = class Model{
    constructor(obj) {
        if (!obj["_metadata"]){
            throw new Error("Invalid Model");
        }else if(!obj["_metadata"]["type"]){
            throw new Error("Invalid Type");
        }
        this.type = obj._metadata.type;
        if (obj._metadata.changeTrack){
            this.changeTrack = obj._metadata.changeTrack;
        }
        if (obj._metadata.instanceId){
            this.instanceId = obj._metadata.instanceId;
        }
        var c = Utils.clone(obj);
        delete c._metadata;
        Object.keys(c).forEach(k => this[k] = obj[k]);
    }

    destroy(){
        this.changeTrack = "destroy";
    }

    getType(){
        return this.type;
    }
}