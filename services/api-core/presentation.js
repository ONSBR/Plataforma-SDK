const BaseEntity = require("./baseEntity");

module.exports = class Presentation extends BaseEntity {
    constructor(configuration){
        super(configuration,"presentation");
    }
}