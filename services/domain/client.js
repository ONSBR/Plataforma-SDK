const Utils = require("../../utils");

module.exports = class DomainClient{

    constructor(systemId, coreFacade,httpClient){
        this.systemId = systemId;
        this.coreFacade = coreFacade;
        this.http = httpClient;
        this.info = this.coreFacade.installedAppFindBySystemIdAndType(this.systemId,"domain");
    }
    query(obj){
        return new Promise((resolve,reject)=>{
            var query = Utils.toQueryString(obj);
            this.info.then(o => {
                var url = `http://${o.host}:${o.port}/${obj.map}/${obj.entity}${query}`
                this.http.get(url,{},{})
            })
        });
    }

    persist(list){

    }

    queryMany(list){
        var promises = list.map(l => Utils.toQueryString(l))
        .map(q => this.query(q));
        return Promise.all(promises);
    }
}