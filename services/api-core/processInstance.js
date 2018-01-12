const Creator = require("./creator");
const Finder = require("./finder");
const BaseEntity = require("./baseEntity");

module.exports = class ProcessInstance extends BaseEntity {
    constructor(configuration){
        super(configuration,"processInstance");
    }

/*     findByReferenceDate(date) {
        var criteria = {
            filterName : "byName",
            parameters:
            [

            ]
        }    
        this.configuration.referenceDate = date;
        return this.finder.find(this.entity, criteria);    
    } */
}