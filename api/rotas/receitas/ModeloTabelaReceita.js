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
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'receitas',
    timestamps: true,
    createdAt: false,
    updatedAt: false
}

module.exports = bd.define('receita', colunas, opcoes)