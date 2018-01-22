var EntityMetadata = require("./EntityMetadata");
var Enumerable = require('linq');

const CHANGETRACK_CREATE = "create";
const CHANGETRACK_UPDATE = "update";
const CHANGETRACK_DELETE = "destroy";

module.exports = class DataSet{
    constructor(){
        this.entities = [];
    }

    insert(entity, entityType) {

        this._validateEntity(entity);
        this._validateEntityType(entityType);

        entity._metadata = new EntityMetadata(entityType, CHANGETRACK_CREATE);
        this.entities.push(entity);
    }

    update(entity) {

        this._validateEntity(entity);
        this._validateMetadata(entity);
        entity._metadata.changeTrack = CHANGETRACK_UPDATE;
    }

    // TODO tem um problema para ser validado que é o caso de consulta após remoção,
    // o item deveria continuar existindo?
    delete(entity) {

        this._validateEntity(entity);
        this._validateMetadata(entity);
        entity._metadata.changeTrack = CHANGETRACK_DELETE;
    }

    queryable(entityType) {

        this._validateEntityType(entityType);
        return Enumerable.from(this.entities).where(
            function(item) {
                return item._metadata.type == entityType
                        && item._metadata.changeTrack != CHANGETRACK_DELETE;
            }
        );
    }

    _validateEntity(entity) {
        if (!entity) {
            throw new Error("Entidade deve ser informada");
        }
    }

    _validateMetadata(entity) {
        if (!entity._metadata) {
            throw new Error("Entidade não tem os metadados.");
        }
    }

    _validateEntityType(entityType) {
        if (!entityType) {
            throw new Error("Tipo da Entidade deve ser informada");
        }
    }
}