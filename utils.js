const prefixEventSystem = "system.event.";

function isSystemEvent(eventName) {
    return eventName.length > prefixEventSystem.length && eventName.substring(0,prefixEventSystem.length) == prefixEventSystem;
}

function getSystemEvent(eventName) {
    return isSystemEvent(eventName)? eventName.replace(prefixEventSystem, "") : undefined;
}

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

/**
 *
 * @param {Object} filterObject An object in format {filter: string, <key:value>...}
 * @description Returns a query string format
 */

function toQueryString(obj){
    var query = [];
    Object.keys(obj).forEach(f =>{
        if (Array.isArray(obj[f])){
            query.push(`${f}=${obj[f].join(";")}`);
        }else{
            query.push(`${f}=${obj[f]}`);
        }
    });
    var q = `?${query.join("&")}`;
    if (q === "?"){
        return "";
    }
    return q;
}

function clone(obj){
    return JSON.parse(JSON.stringify(obj));
}

var utils = {};
utils.getSystemEvent = getSystemEvent;
utils.parseQuery = parseQuery;
utils.isSystemEvent = isSystemEvent;
utils.toQueryString = toQueryString;
utils.clone = clone;
module.exports = utils;

