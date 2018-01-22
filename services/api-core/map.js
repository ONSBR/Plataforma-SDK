const BaseEntity = require("./baseEntity");

module.exports = class Map extends BaseEntity {
    constructor(configuration){
        super(configuration,"map");
    }
}