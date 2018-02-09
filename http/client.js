var unirest = require('unirest');

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
        if (!headers){
            headers = {};
        }
        headers["Accept"] = 'text/plain';
        headers["Content-Type"] = 'text/plain';
        return new Promise((resolve, reject) => {
            unirest[method](url)
                .headers(headers)
                .send(JSON.stringify(body))
                .end((res) => {
                    var resJson = JSON.parse(res, dateReviver);
                    if (resJson.error) {
                        reject(resJson.error);
                    }
                    else {
                        resolve(resJson.body);
                    }
                });
        });
    }

}

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
