const { Router } = require('express');
const Produto = require('../models/Produto');
const upload = require('../multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth')



const produtoRoutes = new Router()

produtoRoutes.post("/", auth, upload.single("imagem"), async (req, res) => {

    /*
        #swagger.tags = ['Produto']
        #swagger.description = 'Cadastra um novo produto'
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters = [
            {
                in: 'formData',
                name: 'imagem',
                type: 'file',
                required: true,
                description: 'Imagem do produto'
            },
    ]
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados do produto',
                schema: {
                    $descricao_produto: "Novo Produto",
                    $preco_unitario: "12",
                    $categoria: "informatica",
                    $qtde_estoque: "41"
                }
        }
    */    

    try {
        const descricao_produto = req.body.descricao_produto
        const preco_unitario = req.body.preco_unitario
        const categoria = req.body.categoria
        const qtde_estoque = req.body.qtde_estoque
        const imagem = req.file.filename

        const produto = await Produto.create({
            descricao_produto: descricao_produto,
            preco_unitario: preco_unitario,
            categoria: categoria,
            qtde_estoque: qtde_estoque,
            imagem_produto: imagem,
            imagem_url: `/uploads/${imagem}`
        })

        res.json(produto)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Não foi possível cadastrar o produto' })
    }
})


produtoRoutes.get('/imagem/:imagem', async (req, res) => {

    /*  
        #swagger.tags = ['Produto'],
        #swagger.description = 'Exibe a imagem do produto',
        #swagger.parameters['imagem'] = {
            in: 'path',
            description: 'Requer o path da imagem',
        }
    */

    try {
        const { imagem } = req.params;
        const caminho = path.join(__dirname, '../uploads', imagem);
        res.sendFile(caminho);
    } catch (err) {
        console.error(err);
        res.status(404).json({ mensagem: 'Imagem não encontrada' });
    }
});

produtoRoutes.get('/', async (req, res) => {

    /*  
        #swagger.tags = ['Produto'],
        #swagger.description = 'Exibe todos os produtos cadastrados'
        }
    */

    try {
        const produtos = await Produto.findAll()
        res.json(produtos)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Não foi possível listar todos os produto" })
    }

})

produtoRoutes.put('/:id_produto', auth, upload.single("imagem"), async (req, res) => {

    /*  
        #swagger.tags = ['Produto'],
        #swagger.description = 'Atualiza produto selecionado',
        #swagger.parameters['id_produto'] = {
            in: 'path',
            description: 'Selecionar o Id do produto',
            type: "number"       
        }
        #swagger.parameters = [
            {
                in: 'formData',
                name: 'imagem',
                type: 'file',
                required: true,
                description: 'Nova imagem do produto'
            },
    ]
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados do produto',
                schema: {
                    $descricao_produto: "Descrição atualizada do Produto",
                    $preco_unitario: "15",
                    $categoria: "informatica",
                    $qtde_estoque: "32"
                }
        }
    */

    try {
        const { id_produto } = req.params
        const descricao_produto = req.body.descricao_produto
        const preco_unitario = req.body.preco_unitario
        const categoria = req.body.categoria
        const qtde_estoque = req.body.qtde_estoque
        const imagem = req.file;


        const editProduto = await Produto.findOne({
            where: {
                id_produto: id_produto,
            }
        })

        if (editProduto) {
            if (imagem) {
                const imagemAntiga = editProduto.imagem_produto;
                if (imagemAntiga) {
                    fs.unlinkSync(`./src/uploads/${imagemAntiga}`);
                }

                editProduto.imagem_produto = imagem.filename
                editProduto.imagem_url = `../uploads/${imagem.filename}`

                editProduto.descricao_produto = descricao_produto
                editProduto.preco_unitario = preco_unitario
                editProduto.categoria = categoria
                editProduto.qtde_estoque = qtde_estoque

                await editProduto.save()

            } else {
                editProduto.update({
                    descricao_produto: descricao_produto,
                    preco_unitario: preco_unitario,
                    categoria: categoria,
                    qtde_estoque: qtde_estoque,
                });

                await editProduto.save()
            }

            res.status(200).json({ message: "Produto atualizado com sucesso!" })
        } else {
            res.status(400).json({ message: "não existe produto cadastrado neste ID" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Não foi possível atualizar produto" })
    }
})

produtoRoutes.delete('/:id_produto', auth, async (req, res) => {

    /*  
        #swagger.tags = ['Produto'],
        #swagger.description = 'Deleta produto selecionado',
        #swagger.parameters['id_produto'] = {
            in: 'path',
            description: 'Selecionar o id do produto',
            type: "number"       
        }
    */

    try {
        const { id_produto } = req.params

        const produto = await Produto.findOne({
            where: {
                id_produto: id_produto
            }
        })

        if (produto) {

            produto.destroy()
            const uploadsImagem = produto.imagem_produto;
            if (uploadsImagem) {
                fs.unlinkSync(`./src/uploads/${uploadsImagem}`);
            }
            res.status(204).json({})
        } else {
            res.status(400).json({ message: "Produto não encontrado" })
        }
    } catch (error) {
        return res.status(500).json({ error: "Não foi possível encontrar produto" })
    }
})


module.exports = produtoRoutes