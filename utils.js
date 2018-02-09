const prefixEventSystem = "system.event.";

function isSystemEvent(eventName) {
    return eventName.length > prefixEventSystem.length && eventName.substring(0, prefixEventSystem.length) == prefixEventSystem;
}

function getSystemEvent(eventName) {
    return isSystemEvent(eventName) ? eventName.replace(prefixEventSystem, "") : undefined;
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


function getFunctionArgs(func) {
    str = func.toString();
    params = "";
    flag_params = false;
    for (var i = 0; i < str.length; i++){
        if (str[i]==="("){
            flag_params = true;
            continue;
        }else if (str[i] === ")"){
            break;
        }
        if (flag_params){
            params += str[i];
        }

    }
    var args = params;
    return args.split(",").map(function (arg) {
        return arg.replace(/\/\*.*\*\//, "").trim();
    }).filter(function (arg) {
        return arg;
    });
}

/**
 *
 * @param {Object} filterObject An object in format {filter: string, <key:value>...}
 * @description Returns a query string format
 */

function toQueryString(obj) {
    var query = [];
    Object.keys(obj).forEach(f => {
        if (Array.isArray(obj[f])) {
            query.push(`${f}=${obj[f].join(";")}`);
        } else {
            query.push(`${f}=${obj[f]}`);
        }
    });
    var q = `?${query.join("&")}`;
    if (q === "?") {
        return "";
    }
    return q;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

var utils = {};
utils.getSystemEvent = getSystemEvent;
utils.parseQuery = parseQuery;
utils.isSystemEvent = isSystemEvent;
utils.toQueryString = toQueryString;
utils.getFunctionArgs = getFunctionArgs;
utils.clone = clone;
module.exports = utils;

