const Utils = require("../../utils");

module.exports = class DomainClient{

    constructor(appInfo, coreFacade,httpClient){
        this.systemId = appInfo.systemId;
        this.coreFacade = coreFacade;
        this.http = httpClient;
        this.info = this.coreFacade.installedAppFindBySystemIdAndType(this.systemId,"domain");
    }
    query(obj){
        return new Promise((resolve,reject)=>{
            var clone = Utils.clone(obj);
            delete clone["_entity"];
            delete clone["_map"];
            var query = Utils.toQueryString(clone);
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${obj._map}/${obj._entity}${query}`
                this.http.get(url).then(body => {
                    resolve(body);
                }).catch(reject);
            })
        });
    }

    persist(data,map){
        return new Promise((resolve,reject)=>{
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${map}/persist`
                this.http.post(url,data).then(body => {
                    resolve(body);
                }).catch(reject);
            })
        });
    }

    queryMany(list){
        var list = list.map(l => this.query(l));
        return Promise.all(list);
    }
}