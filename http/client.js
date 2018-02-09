var unirest = require('unirest');

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

module.exports = class HttpClient {
    get(url, body, headers) {
        return this.doRequest("get", url, body, headers);
    }

    post(url, body, headers) {
        return this.doRequest("post", url, body, headers);
    }

    put(url, body, headers) {
        return this.doRequest("put", url, body, headers);
    }

    doRequest(method, url, body, headers) {
        if (!headers) {
            headers = {};
        }
        headers["Accept"] = 'application/json';
        headers["Content-Type"] = 'application/json';
        return new Promise((resolve, reject) => {
            unirest[method](url)
                .headers(headers)
                .send(body)
                .end((res) => {
                    if (res.error) {
                        reject(res.error);
                    }
                    else {
                        resolve(res.body);
                    }
                });
        });
    }

}


