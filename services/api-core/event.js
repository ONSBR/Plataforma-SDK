
var Creator = require("./creator");

module.exports = class Event {
    constructor(configuration){
        this.creator = new Creator(configuration);
    }

/*
[
    {
        "systemId": "995d5970-1c56-483f-bf3c-90fdcbc428b7",
        "name": "conta.created",
        "_metadata": {
            "type": "event",
            "changeTrack":"create"
        }
    }
]
*/

    create(event){

        event._metadata = {
            type:"event",
            changeTrack:"create"
        };
        return this.creator.create([event]);
    }

    findById(id){}

    findByName(){
        return this.finder.byName('event');
    }    

}