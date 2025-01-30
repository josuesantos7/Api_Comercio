const { Router }= require('express')
const usuarioRoutes = require('./usuarios.route')
const produtoRoutes = require('./produtos.route')
const { Model } = require('sequelize')


const routes = Router()

routes.use('/usuarios', usuarioRoutes)
routes.use('/produtos', produtoRoutes)




module.exports = routes