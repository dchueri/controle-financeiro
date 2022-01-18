const Sequelize = require('sequelize')
const bd = require('../../banco-de-dados')

const colunas = {
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'despesas',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao'
}

module.exports = bd.define('despesa', colunas, opcoes)