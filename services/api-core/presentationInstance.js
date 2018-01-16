const Creator = require("./creator");
const Finder = require("./finder");
const BaseEntity = require("./baseEntity");

module.exports = class PresentationInstance extends BaseEntity {
    constructor(configuration){
        super(configuration,"presentationInstance");
    }    



    findBySystemIdType(presentationId) {
        var criteria = {
            filterName : "byPresentationId",
            parameters :
            [
                {
                    fieldName : "presentationId",
                    fieldValue : presentationId
                }
            ]
        }
        return this.finder.find('presentationInstance', criteria);
    }
        
}