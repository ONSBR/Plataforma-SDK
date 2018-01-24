const BaseEntity = require("./baseEntity");

module.exports = class Event extends BaseEntity {
    constructor(configuration){
        super(configuration,"event");
    }
}