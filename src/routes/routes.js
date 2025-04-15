const { Router }= require('express')
const usuarioRoutes = require('./usuarios.route')
const produtoRoutes = require('./produtos.route')
const loginRoutes = require('./login.route')


const routes = Router()

routes.use('/usuarios', usuarioRoutes)
routes.use('/produtos', produtoRoutes)
routes.use('/login', loginRoutes)




module.exports = routes