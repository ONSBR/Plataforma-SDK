const Utils = require("../../utils");

module.exports = class DomainClient{

    constructor(appInfo, coreFacade,httpClient){
        this.systemId = appInfo.systemId;
        this.coreFacade = coreFacade;
        this.http = httpClient;
        this.info = this.coreFacade.installedAppFindBySystemIdAndType(this.systemId,"domain");
    }

    reference(date){
        if(date){
            this.referenceDate = date;
            this.info = this.coreFacade.reference(this.referenceDate).installedAppFindBySystemIdAndType(this.systemId,"domain");
        }
        return this;
    }
    query(obj){
        return new Promise((resolve,reject)=>{
            var clone = Utils.clone(obj);
            if (!clone["_entity"]){
                return resolve([]);
            }
            delete clone["_entity"];
            delete clone["_map"];
            var query = Utils.toQueryString(clone);
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${obj._map}/${obj._entity}${query}`;
                console.log(`Calling url ${url}`);
                this.http.get(url).then(body => {
                    // TODO muitos dados console.log(`response ${JSON.stringify(body,null,4)}`);
                    resolve(body);
                }).catch(reject);
            });
        });
    }

    persist(data,map,instance_id){
        var headers = {};
        if (instance_id) {
            headers["Instance-Id"] = instance_id;
        }
        return new Promise((resolve,reject)=>{
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${map}/persist`
                this.http.post(url,data,headers).then(body => {
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