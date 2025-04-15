const { Router } = require('express')
const Usuario = require('../models/Usuario')


const loginRoutes = new Router()
 
 loginRoutes.post('/', async (req, res) => {
     try {
         const email = req.body.email
         const password = req.body.password
 
         if (!email) {
             return res.status(400).json({ message: 'O email é obrigatório' })
         }
 
         if (!password) {
             return res.status(400).json({ message: 'O password é obrigatório' })
         }
 
         const usuario = await Usuario.findOne({
             where: {email:email}
         })
 
         if(!usuario){
             return res.status(404).json({ error: 'Nenhum usuário corresponde a email e senha fornecidos!' })
         }
 
         const senha = await Usuario.findOne({
             where: {
                password:password,
                email:email
            }
         })
 
         if(usuario.password === password){
             return res.status(403).json({ message: "Usuário logado com sucesso"})
         } else {
             return res.status(403).json({ message: 'Dados inválidos'})
         }
         
     } catch (error) {
         return res.status(500).json({ error: error, message: 'Algo deu errado!' })
     }
 })
 
 
 module.exports = loginRoutes
