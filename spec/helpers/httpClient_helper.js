module.exports = class HttpClientHelper {

    constructor(){
        this.resolveMap = {};
    }

    get(url, body, headers){
        return this.resolve("get",url);
    }

    post(url, body, headers){
        return this.resolve("post",url);
    }

    put(url, body, headers){
        return this.resolve("put",url);
    }

    when(method,url,response){
        this.resolveMap[`${method}${url}`] = response;
    }

    resolve(method,url){
        return new Promise((resolve,reject)=>{
            try{
                resolve(this.resolveMap[`${method}${url}`]());
            }catch(e){
                reject(e);
            }
        });
    }
}
