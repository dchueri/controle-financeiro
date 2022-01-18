//const ModeloTabelaReceita = require('../rotas/receitas/ModeloTabelaReceita')

const Modelos = [
    require('../rotas/receitas/ModeloTabelaReceita'),
    require('../rotas/despesas/ModeloTabelaDespesa')
]

async function criarTabelas() {
    for (i = 0; i < Modelos.length; i++) {
        const modelo = Modelos[i]
        await modelo.sync()
    }
}

criarTabelas()