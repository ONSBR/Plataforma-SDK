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
        headers["Accept"] = 'application/json';
        header["Content-Type"] = 'application/json';
        return new Promise((resolve, reject) => {
            unirest[method](url)
                .headers(headers)
                .send(body)
                .end((res) => {
                    if (res.error) {
                        reject(res.error);
                    }
                    else {
                        resolve(res.body)
                    }
                });
        });
    }
}