const { Router } = require('express')
const Usuario = require('../models/Usuario')
const { auth } = require('../middleware/auth')


const usuarioRoutes = new Router()

usuarioRoutes.post('/', async(req, res) => {
    try {
        const nome = req.body.nome 
        const data_nascimento = req.body.data_nascimento
        const cpf = req.body.cpf
        const email = req.body.email
        const password = req.body.password
        const sexo = req.body.sexo

        //Validações de CPF e E-mail.
        const VerifyCpf = await Usuario.findOne({
            where: {
                cpf: cpf,
            }
        })
        const VerifyEmail = await Usuario.findOne({
            where: {
                email: email,
            }
        })
        if (VerifyCpf){
            return res.status(409).json({ message: "CPF já cadastrado!"})
        }
        if (VerifyEmail){
            return res.status(409).json({ message: "Email já cadastrado!"})
        }


        const usuario = await Usuario.create({
            nome: nome,
            data_nascimento: data_nascimento,
            cpf: cpf,
            email: email,
            password: password,
            sexo: sexo
        })
        res.json(usuario)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível cadastrar o usuário' })
    }
})


usuarioRoutes.get('/', auth, async(req, res) => {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
})

usuarioRoutes.put('/:id', auth, async(req, res) => {
    try {

        let { id } = req.params

        const nome = req.body.nome 
        const data_nascimento = req.body.data_nascimento
        const cpf = req.body.cpf
        const email = req.body.email
        const password = req.body.password
        const sexo = req.body.sexo

        const editUsuario = await Usuario.findOne({
            where: {
                id: id
            }
        })

        if (editUsuario){
            editUsuario.update({
                nome : nome,
                data_nascimento : data_nascimento,
                cpf : cpf,
                email : email,
                password : password,
                sexo : sexo
            })

            await editUsuario.save()

            res.status(200).json({message:"Usuário atualizado com sucesso!"}) 
        } else {
            res.status(400).json({message: "Não existe usuário cadastrado neste ID"})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Houve um erro no processo"})
    }
})

usuarioRoutes.delete('/:id', auth, async(req, res) => {

    try {
        const { id } = req.params

        const usuario = await Usuario.findOne({
            where: {
                id: id
            }
        })

        if (usuario){
            usuario.destroy()
            res.status(204).json({})  
        } else {
            res.status(400).json({message: "Usuário não encontrado"})
        }

    } catch (error) {
         console.error(error);
         return res.status(500).json({ error: "Houve um erro no processo"})
        }
})



module.exports = usuarioRoutes