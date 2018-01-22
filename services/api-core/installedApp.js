const Creator = require("./creator");
const Finder = require("./finder");
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
        return this.finder.find('installedApp', criteria);
    }
}