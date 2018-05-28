const BaseEntity = require("./baseEntity");

module.exports = class Branch extends BaseEntity {
    constructor(configuration) {
        super(configuration, "branch");
    }

    findBySystemIdAndName(systemId, name) {
        var criteria = {
            filterName: "bySystemIdAndName",
            parameters: [{
                    fieldName: "systemId",
                    fieldValue: systemId
                },
                {
                    fieldName: "name",
                    fieldValue: name
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.httpClient.get(url);
    }

    findBySystemIdAndOwner(systemId, owner) {
        var criteria = {
            filterName: "bySystemIdAndOwner",
            parameters: [{
                    fieldName: "systemId",
                    fieldValue: systemId
                },
                {
                    fieldName: "owner",
                    fieldValue: owner
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.httpClient.get(url);
    }

}