const Creator = require("./creator");
const Finder = require("./finder");
const BaseEntity = require("./baseEntity");

module.exports = class Process extends BaseEntity {
    constructor(configuration){
        super(configuration,"process");
    }
}