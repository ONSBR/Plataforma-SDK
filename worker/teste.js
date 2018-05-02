const SDK = require("./sdk");

SDK.run((context, resolve, reject, fork) => {
    fork("meu_cenario","bla bla")
    console.log("Realizando Transferencia");
    var params = context.event.payload;
    
    var contaOrigem = context.dataset.Conta.collection.first(c => c.id === params.origem);
    var contaDestino = context.dataset.Conta.collection.first(c => c.id === params.destino);

    contaOrigem.saldo -= params.valor;
    contaDestino.saldo += params.valor;

    context.dataset.Conta.update(contaOrigem);
    context.dataset.Conta.update(contaDestino);

    
    resolve();
})