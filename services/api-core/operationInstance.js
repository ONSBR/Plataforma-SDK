const Creator = require("./creator");
const Finder = require("./finder");
const BaseEntity = require("./baseEntity");

module.exports = class OperationInstance extends BaseEntity {
    constructor(configuration){
        super(configuration,"operationInstance");
    }
}