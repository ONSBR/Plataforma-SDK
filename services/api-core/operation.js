
var Creator = require("./creator");

module.exports = class Operation {
    constructor(configuration){
        this.creator = new Creator(configuration);
    }

/*
[
    {
        "processId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "method": "realizeTransferencia",
        "file":"index.js",
        "_metadata": {
            "type": "operation",
            "changeTrack":"create"
        }
    }
]
*/

    create(operation){

        operation._metadata = {
            type:"operation",
            changeTrack:"create"
        };
        return this.creator.create([operation]);
    }

    findById(id){}

    findByName(){
        return this.finder.byName('operation');
    }    

}