const BaseEntity = require("./baseEntity");

module.exports = class InstalledApp extends BaseEntity {
    constructor(configuration){
        super(configuration,"installedApp");
    }

    findBySystemIdAndType(systemId,type){
        var criteria = {
            filterName : "bySystemIdAndType",
            parameters :
            [
                {
                    fieldName : "systemId",
                    fieldValue : systemId
                },
                {
                    fieldName : "type",
                    fieldValue : type
                }
            ]
        }
       var url = this.assembleFindUrl(criteria);
       return this.get(url);
    }
}