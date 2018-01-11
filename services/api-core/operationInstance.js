var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class OperationInstance {
    constructor(configuration){
        this.creator = new Creator(configuration);
        this.finder = new Finder(configuration);
    }

/*
[
    {
        "processInstanceId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "operationId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "mustCommit": true,
        "status":"pending",
        "_metadata": {
            "type": "operationInstance",
            "changeTrack":"create"
        }
    }
]
*/

    create(operationInstance){

        operationInstance._metadata = {
            type:"operationInstance",
            changeTrack:"create"
        };
        return this.creator.create([operationInstance]);
    }

    findById(id){
        var criteria = {
            filterName : "byId",
            parameters:
            [
                {
                    fieldName : "id",
                    fieldValue : id
                }
            ]
        }        
        return this.finder.find('operationInstance', criteria, 1);
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