var fs = require("fs");
var yaml = require("js-yaml");
var handlebars = require('handlebars');
var config = require("./config");

function geraEntidade(nomeDoYaml) {
    console.log("Gerando entidade a partir do yaml=" + nomeDoYaml);
    let yamlFile = lerYaml(nomeDoYaml);
    let yamlMapper = yaml.safeLoad(yamlFile);
    var campos = eval("yamlMapper."+ nomeDoYaml + ".fields");
    geraJs(nomeDoYaml, campos);
}

function geraJs(nomeDoYaml, campos) {
    var source = fs.readFileSync(config.diretorioDeDominio + "/dominio.tmpl").toString();
    var template = handlebars.compile(source);
    var objTemplate = { "nomeDaClasse":nomeDoYaml, "campos":getListaDeCampos(campos)}; 
    var compiled = template(objTemplate);
    fs.writeFileSync(config.diretorioDeDominio + "/" + nomeDoYaml + ".js", compiled);
}

function getListaDeCampos(campos) {
    var lista = [];
     for (campo in campos) {
        lista.push({campo: campo});
    }
    return lista;
}

function lerYaml(nomeDoYaml) {
    let yamlFile = fs.readFileSync(config.diretorioDeMapas + "/"+ nomeDoYaml +".yaml");
    return yamlFile;
}

module.exports.geraEntidade = geraEntidade;