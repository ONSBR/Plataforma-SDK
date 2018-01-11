const Creator = require("./creator");
const Finder = require("./finder");
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
        return this.finder.find('operationInstance', criteria);
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
        return this.finder.find('operationInstance', criteria);
    }
}