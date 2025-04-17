const { Router }= require('express')
const usuarioRoutes = require('./usuarios.route')
const produtoRoutes = require('./produtos.route')
const loginRoutes = require('./login.route')
const swaggerUi = require('swagger-ui-express');
 const swaggerDocument = require('./doc.swagger.json')


const routes = Router()

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use('/login', loginRoutes)
routes.use('/usuarios', usuarioRoutes)
routes.use('/produtos', produtoRoutes)




module.exports = routes