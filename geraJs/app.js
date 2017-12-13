var geraJsAPartirDoYamls = require('./geraJsAPartirDoYamls');
var fs = require("fs");
var config = require("./config");

var files = fs.readdirSync(config.diretorioDeMapas);

for(var i in files) {
    geraJsAPartirDoYamls.geraEntidade(files[i].toString().split(".yaml")[0]);
}

