const Utils = require("../../utils");

module.exports = class DomainClient {

    constructor(appInfo, coreFacade, httpClient) {
        this.systemId = appInfo.systemId;
        this.instanceId = appInfo.processInstanceId;
        this.coreFacade = coreFacade;
        this.http = httpClient;
        this.info = this.coreFacade.installedAppFindBySystemIdAndType(this.systemId, "domain");
    }

    reference(date) {
        if (date) {
            this.referenceDate = date;
            this.info = this.coreFacade.reference(this.referenceDate).installedAppFindBySystemIdAndType(this.systemId, "domain");
        }
        return this;
    }


    onBranch(branch) {
        if (branch) {
            this.branch = branch;
        }
        return this;
    }

    findById(map, type, id) {
        var headers = {};
        if (this.instanceId) {
            headers["Instance-Id"] = this.instanceId;
        }
        headers["Branch"] = this.branch;
        return new Promise((resolve, reject) => {
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${map}/${type}?filter=byId&id=${id}`;
                this.http.get(url,{},headers).then(body => {
                    if (body[0]) {
                        resolve(body[0]);
                    } else {
                        resolve(null);
                    }
                }).catch(reject);
            });
        });
    }

    query(obj, context) {
        return new Promise((resolve, reject) => {
            var headers = {};
            headers["Branch"] = this.branch;
            if (this.instanceId) {
                headers["Instance-Id"] = this.instanceId;
            }
            var clone = Utils.clone(obj);
            if (!clone["_entity"]) {
                return resolve([]);
            }
            delete clone["_entity"];
            delete clone["_map"];
            var query = Utils.toQueryString(clone);
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${obj._map}/${obj._entity}${query}`;
                this.http.get(url, {}, headers).then(body => {
                    if (context) {
                        body.forEach(item => {
                            item._metadata.queryInfo = {}
                            item._metadata.queryInfo.name = context.map.content[obj._entity].model
                            item._metadata.queryInfo.query = context.map.content[obj._entity].filters[clone.filter]
                            delete clone["filter"]
                            item._metadata.queryInfo.filter = clone
                        });
                    }
                    resolve(body);
                }).catch(reject);
            });
        });
    }

    persist(data, map, instance_id) {
        var headers = {};
        if (instance_id) {
            headers["Instance-Id"] = instance_id;
        }
        return new Promise((resolve, reject) => {
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${map}/persist`;
                this.http.post(url, data, headers).then(body => {
                    resolve(body);
                }).catch(reject);
            })
        });
    }


    dropBranch(branchName, currentUser) {
        return this.info.then(list => {
            var o = list[0];
            var url = `http://${o.host}:${o.port}/dropBranch?branch=${branchName}&user=${currentUser}`;
            return this.http.post(url, {})
        })
    }

    persistAsync(map, instance_id) {
        var headers = {};
        if (instance_id) {
            headers["Instance-Id"] = instance_id;
        }
        return new Promise((resolve, reject) => {
            this.info.then(list => {
                var o = list[0];
                var url = `http://${o.host}:${o.port}/${map}/${instance_id}/persist_async`;
                this.http.post(url, {}, headers).then(body => {
                    resolve(body);
                }).catch(reject);
            })
        });
    }

    queryMany(list, context) {
        var list = list.map(l => this.query(l, context));
        return Promise.all(list);
    }
}