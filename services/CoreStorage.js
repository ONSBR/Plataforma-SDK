var database = require("../../Plataforma-ProcessMemory/database.js");
var utils = require("../../Plataforma-ProcessMemory/utils.js");

var bd = database.loadDabase("core.db");
if (bd == undefined) {
    bd = new database.Database("core.db");
}

function CoreStorage() {
    this.create = function(body, type, id) {
        var doc = {};
        doc._document = body;
        doc._document._type = type;
        if(!id) id = utils.guid();
        doc._document.id = id
        bd.save(doc,"master","sistema","dado salvo");
        return doc._document.id;
    };

    this.commit = function(id, body, type) {
        var doc = {};
        doc._document = body;
        doc._document._type= type;
        doc._document.id = id;
        bd.save(doc,"master","sistema","dado salvo");
        return doc._document.id;        
    };

    this.head = function(id, type) {        
        return bd.get_by_id(type, id);
    };

    this.history = function(type, id) {
        return bd.history(type, id).commits().map(c => {
            var obj = c._data._document;
            obj.timestamp = c._timestamp;
            return obj;
        } );
    };
}

module.exports = {CoreStorage}