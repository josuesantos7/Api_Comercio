const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')


const Produto = connection.define('produtos', {

    id_produto:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,            
        type: DataTypes.INTEGER
    },
    descricao_produto:{
        type: DataTypes.STRING,
        allowNull:false
    },
    preco_unitario: {
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull:false
    },
    qtde_estoque: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    imagem_produto: {
        type: DataTypes.BLOB,
        allowNull:false
    },
    imagem_url: {
        type: DataTypes.STRING,
        allowNull:false
    }
})


module.exports = Produto