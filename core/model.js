const Utils = require("../utils");
module.exports = class Model {
    constructor(obj) {
        if (!obj["_metadata"]) {
            throw new Error("Invalid Model");
        } else if (!obj["_metadata"]["type"]) {
            throw new Error("Invalid Type");
        }
        Object.keys(obj).forEach(k => this[k] = obj[k]);
    }

    destroy() {
        this.changeTrack = "destroy";
    }

    getType() {
        return this._metadata.type;
    }
}