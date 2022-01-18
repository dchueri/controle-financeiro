const ModeloTabelaReceita = require('../rotas/receitas/ModeloTabelaReceita')

const modelos = [
    require('../rotas/receitas/ModeloTabelaReceita'),
    //require('../rotas/despesas/ModeloTabelaDespesa')
]

ModeloTabelaReceita
    .sync()
    .then()
    .catch(console.log)
/* async function criarTabelas() {
    for (i = 0; i < modelos.length; i++) {
        const modelo = modelos[i]
        await modelo.sync()
    }
}

criarTabelas() */