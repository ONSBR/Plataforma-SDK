function dateReviver(key, value) {
    var a;
    if (typeof value === 'string') {
        a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (a) {
            return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                +a[5], +a[6]));
        }
    }
    return value;
};

if (!JSON.parse.changed) {
    var jsonParse = JSON.parse;
    JSON.parse = function (str) { return jsonParse(str, dateReviver) };
    JSON.parse.changed = true;
}

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
    var pattern = /["]+/g;
    Object.keys(obj).forEach(f => {
        if (Array.isArray(obj[f])) {
            query.push(`${f}=${obj[f].join(";")}`);
        } else {
            var valueStr = JSON.stringify(obj[f]).replace(pattern, "");
            query.push(`${f}=${valueStr}`);
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

