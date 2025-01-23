const { Router }= require('express')
const usuarioRoutes = require('./usuarios.route')
const { Model } = require('sequelize')


const routes = Router()

routes.use('/usuarios', usuarioRoutes)




module.exports = routes