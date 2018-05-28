const BaseEntity = require("./baseEntity");

module.exports = class Operation extends BaseEntity {
    constructor(configuration){
        super(configuration,"operation");
    }

    findByEventInAndSystemId(systemId,eventIn){
        var criteria = {
            filterName : "bySystemIdAndEventIn",
            parameters :
            [
                {
                    fieldName : "systemId",
                    fieldValue : systemId
                },
                {
                    fieldName : "event",
                    fieldValue : eventIn
                }
            ]
        }
       var url = this.assembleFindUrl(criteria);
       return this.get(url);
    }
}