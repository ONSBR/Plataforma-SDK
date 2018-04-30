const BaseEntity = require("./baseEntity");

module.exports = class DomainModel extends BaseEntity {
    constructor(configuration){
        super(configuration,"domain_model");
    }

    findBySystemIdAndName(systemId, name){
        var criteria = {
            filterName : "bySystemIdAndName",
            parameters :
            [
                {
                    fieldName : "systemId",
                    fieldValue : systemId
                },
                {
                    fieldName : "name",
                    fieldValue : name
                }
            ]
        }
       var url = this.assembleFindUrl(criteria);
       return this.httpClient.get(url);
    }

}