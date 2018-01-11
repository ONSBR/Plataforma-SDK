
var Creator = require("./creator");

module.exports = class OperationInstance {
    constructor(configuration){
        this.creator = new Creator(configuration);
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

    findById(id){}

    findByName(){
        return this.finder.byName('operationInstance');
    }       

}