### Dataset

Dataset é o conjunto de objetos recuperados do dominio, baseado nos filtros dos mapas, que serão disponibilizados para a sua aplicação através do contexto de execução.

O exemplo abaixo mostra como acessar os dados do dataset de sua aplicação.

```javascript
const SDK = require("plataforma-sdk/worker/sdk")

SDK.run((context, resolve) => {
    var payload = context.event.payload;
    console.log(payload);
    var cotacoes = context.dataset.Cotacao.collection.toArray();
    var mediaHistoricas = context.dataset.MediaHistorica.collection.toArray();
    resolve();
});
```


Além de acessar os dados é possivel inserir, editar e excluir um registro através do dataset, segue um exemplo de manipulação dos dados de um dataset

```javascript
const SDK = require("plataforma-sdk/worker/sdk")

SDK.run((context, resolve) => {
    var params = context.event.payload;
    var cotacoes = context.dataset.Cotacao.collection.toArray();
    var mediaHistoricas = context.dataset.MediaHistorica.collection.toArray();
    var hashmap = {}
    var hashMedias = {}
    if (mediaHistoricas.length > 0) {
        mediaHistoricas.forEach(m => {
            hashMedias[m.tipo] = m
        })
    }
    cotacoes.forEach(cotacao => {
        if (!hashmap[cotacao.tipo]){
            hashmap[cotacao.tipo] = []
        }
        hashmap[cotacao.tipo].push(cotacao)
    });

    Object.keys(hashmap).forEach(tipo => {
        if (!hashMedias[tipo]){
            var novaMedia = {
                ano:params.ano,
                mes:params.mes,
                empresa:params.empresa,
                tipo:tipo,
                media: calculaMedia(hashmap[tipo])
            }
            context.dataset.MediaHistorica.insert(novaMedia)
        }else{
            var media = hashMedias[tipo]
            media.media = calculaMedia(hashmap[tipo])
            context.dataset.MediaHistorica.update(media)
        }
    })
    resolve();
});

```