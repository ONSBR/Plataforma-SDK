const SDK = require("./sdk")

SDK.run((context,resolve,reject)=>{
    console.log("Hello World");
    console.log(context.dataset.Conta.collection.toArray());
    console.log("*************")
    var contas = context.dataset.Conta.collection.where(c => 1===1).toArray();
    //console.log(contas);
    //console.log(JSON.stringify(context,null,4));
    resolve();
})