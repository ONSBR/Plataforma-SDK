
const System = require("./system");
module.exports = class ApiCoreFacade{
    constructor(configuration){
        this.conf = configuration;
        this.system = new System(configuration);
    }

    saveSystem(system){
        return this.system.create(system);
    }
}