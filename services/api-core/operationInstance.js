const BaseEntity = require("./baseEntity");

module.exports = class OperationInstance extends BaseEntity {
    constructor(configuration){
        super(configuration,"operationInstance");
    }

    findByProcessInstanceId(processInstanceId){
        var criteria = {
            filterName : "byProcessInstanceId",
            parameters :
            [
                {
                    fieldName : "processInstanceId",
                    fieldValue : processInstanceId
                }
            ]
        }
       var url = this.assembleFindUrl(criteria);
       return this.httpClient.get(url);
    }

    findByOperationId(operationId){
        var criteria = {
            filterName : "byOperationId",
            parameters :
            [
                {
                    fieldName : "operationId",
                    fieldValue : operationId
                }
            ]
        }
       var url = this.assembleFindUrl(criteria);
       return this.httpClient.get(url);
    }
}