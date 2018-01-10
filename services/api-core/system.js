
var Creator = require("./creator");
var Finder = require("./finder");

module.exports = class System {
    constructor(configuration){
        this.creator = new Creator(configuration);
        this.finder = new Finder(configuration);
    }

    create(system){

        system._metadata = {
            type:"system",
            changeTrack:"create"
        };
        
        return this.creator.create([system]);
    }

    /* { filterName : filter,
         fieldName : field,
         fieldValue : value } */
    find(criteria) {
        return this.find('system', criteria);
    }


    findAll(){
        return this.finder.all('system');
    }
}