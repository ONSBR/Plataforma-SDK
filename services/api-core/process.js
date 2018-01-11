
var Creator = require("./creator");

module.exports = class Process {
    constructor(configuration){
        this.creator = new Creator(configuration);
    }

/*
[
    {
        "systemId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "name": "Transferência",
        "relativePath":"./",
        "deployDate":"2018-01-08 14:24:36",
        "_metadata": {
            "type": "process",
            "changeTrack":"create"
        }
    }
]
*/

    create(process){

        process._metadata = {
            type:"process",
            changeTrack:"create"
        };
        return this.creator.create([process]);
    }

    

    findById(id){}

    findByName(){
        return this.finder.byName('process');
    }    

}