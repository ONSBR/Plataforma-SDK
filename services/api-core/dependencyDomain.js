const BaseEntity = require("./baseEntity");

module.exports = class DependencyDomain extends BaseEntity {
    constructor(configuration){
        super(configuration,"dependencyDomain");
    }
}