const SDK = require("./sdk")

SDK.run((context,resolve,reject)=>{
    console.log("Hello World");
    console.log(JSON.stringify(context,null,4));
    resolve();
})