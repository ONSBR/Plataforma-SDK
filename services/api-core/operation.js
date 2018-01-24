const BaseEntity = require("./baseEntity");

module.exports = class Operation extends BaseEntity {
    constructor(configuration){
        super(configuration,"operation");
    }
}