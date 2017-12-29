var database = require("plataforma-processmemory/database.js");
var utils = require("plataforma-processmemory/utils.js");

bdFile = process.env.BD_VOLUME || "core.db";

var bd = database.loadDabase(bdFile);
if (bd == undefined) {
    console.log("Base do core será criada:" + bdFile);
    bd = new database.Database(bdFile);
} else {
    console.log("Base do core já existia:" + bdFile);
}

class CoreStorage {

    constructor() {

        this.create = function (body, type, id) {
            var doc = {};
            doc._document = body;
            doc._document._type = type;
            if (!id)
                id = utils.guid();
            doc._document.id = id;
            bd.save(doc, "master", "sistema", "dado salvo");
            return doc._document.id;
        };
        this.commit = function (id, body, type) {
            var doc = {};
            doc._document = body;
            doc._document._type = type;
            doc._document.id = id;
            bd.save(doc, "master", "sistema", "dado salvo");
            return doc._document.id;
        };
        this.head = function (id, type) {
            return bd.get_by_id(type, id);
        };
        this.list = function (type) {
            return bd.find_all(type);
        };
        this.history = function (type, id) {
            return bd.history(type, id).commits().map(c => {
                var obj = c._data._document;
                obj.timestamp = c._timestamp;
                return obj;
            });
        };
    }
}

module.exports = CoreStorage;