const BaseEntity = require("./baseEntity");

module.exports = class System extends BaseEntity {
    constructor(configuration){
        super(configuration,"system");
    }
}