const BaseEntity = require("./baseEntity");

module.exports = class ProcessInstance extends BaseEntity {
    constructor(configuration){
        super(configuration,"processInstance");
    }
}