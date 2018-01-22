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
        query.push(`${f}=${obj[f]}`);
    })
    return `?${query.join("&")}`;
}

var utils = {};
utils.getSystemEvent = getSystemEvent;
utils.parseQuery = parseQuery;
utils.isSystemEvent = isSystemEvent;
utils.toQueryString = toQueryString;
module.exports = utils;

