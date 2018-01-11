
var Creator = require("./creator");

module.exports = class ProcessInstance {
    constructor(configuration){
        this.creator = new Creator(configuration);
    }

/*
[
    {
        "processId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "startExecution": "2018-01-08 12:00:01",
        "endExecution": "2018-01-08 12:00:02",
        "referenceDate": "2018-01-08 12:00:03",
        "status":"pending",
        "_metadata": {
            "type": "processInstance",
            "changeTrack":"create"
        }
    }
]
*/

    create(processInstance){

        processInstance._metadata = {
            type:"processInstance",
            changeTrack:"create"
        };
        return this.creator.create([processInstance]);
    }

    findById(id){}

    findByName(){
        return this.finder.byName('processInstance');
    }    

}