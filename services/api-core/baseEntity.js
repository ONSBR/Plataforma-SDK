
var HttpClient = require("../../http/client");

module.exports = class BaseEntity {

    constructor(configuration, entity){
        this.conf = configuration;
        this.httpClient = new HttpClient();
        this.entity = entity;
    }

    reference(date){
        this.referenceDate = date;
        return this;
    }

    post(url,body){
        if(this.referenceDate){
            return this.httpClient.post(url,body,{"Reference-Date":this.referenceDate});
        }else{
            return this.httpClient.post(url,body);
        }
    }

    get(url){
        if(this.referenceDate){
            console.log("A")
            return this.httpClient.get(url,null,{"Reference-Date":this.referenceDate});
        }else{
            console.log("B")
            return this.httpClient.get(url);
        }
    }

    destroy(obj){
        var url = this.conf.scheme + "://" +
        this.conf.host + ":" +
        this.conf.port + "/core/persist";
        if (Array.isArray(obj)){
            var items = obj.map(o => {
                o._metadata = {
                    type: this.entity,
                    changeTrack:"destroy"
                };
                return o;
            })
            return this.post(url, items);
        }else{
            obj._metadata = {
                type:this.entity,
                changeTrack:"destroy"
            };
            return this.post(url, [obj]);
        }
    }

     create(map){
        var url = this.conf.scheme + "://" +
        this.conf.host + ":" +
        this.conf.port + "/core/persist";
        if (Array.isArray(map)){
            var items = map.map(m => {
                m._metadata = {
                    type:this.entity,
                    changeTrack:"create"
                };
                return m;
            });
            return this.post(url, items);
        }else{
            map._metadata = {
                type:this.entity,
                changeTrack:"create"
            };
            return this.post(url, [map]);
        }
    }

    save(map) {
        var url = this.conf.scheme + "://" +
        this.conf.host + ":" +
        this.conf.port + "/core/persist";

        if (Array.isArray(map)){
            var items = map.map(m => {
                if (m.id == undefined) {
                    m._metadata = {
                        type:this.entity,
                        changeTrack : "create"
                    };
                }
                else {
                    m._metadata = {
                        type:this.entity,
                        changeTrack : "update"
                    };
                }
                return m;
            });
            return this.httpClient.post(url, items);
        }else{
            if (map.id == undefined) {
                map._metadata = {
                    type:this.entity,
                    changeTrack : "create"
                };
            }
            else {
                map._metadata = {
                    type:this.entity,
                    changeTrack : "update"
                };
            }
            return this.post(url, [map]);
        }
    }

    assembleFindUrl(criteria) {
        var url = this.conf.scheme + "://"
        + this.conf.host + ":"
        + this.conf.port + "/core/" + this.entity +
        "?filter=" + criteria.filterName;

        var i = 0;
        for (i in criteria.parameters) {
            url += "&" + criteria.parameters[i].fieldName + "="
            + criteria.parameters[i].fieldValue;
        }
        return url;
    }

    findByName(name) {
        var criteria = {
            filterName : "byName",
            parameters:
            [
                {
                    fieldName : "name",
                    fieldValue : name
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.get(url);
    }

    findBySystemId(id) {
        var criteria = {
            filterName : "bySystemId",
            parameters:
            [
                {
                    fieldName : "systemId",
                    fieldValue : id
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.get(url);
    }

    findByProcessId(id) {
        var criteria = {
            filterName : "byProcessId",
            parameters:
            [
                {
                    fieldName : "processId",
                    fieldValue : id
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.get(url);
    }

    findByProcessIdAndVersion(id, version) {
        var criteria = {
            filterName : "byProcessIdAndVersion",
            parameters:
            [
                {
                    fieldName : "processId",
                    fieldValue : id
                },
                {
                    fieldName : "version",
                    fieldValue : version
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.get(url);
    }




    findById(id) {
        var criteria = {
            filterName : "byId",
            parameters:
            [
                {
                    fieldName : "id",
                    fieldValue : id
                }
            ]
        }
        var url = this.assembleFindUrl(criteria);
        return this.get(url);
    }


}