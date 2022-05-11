require("../Schemas/Products")
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = mongoose.model("product")

router.use(bodyParser.json())

// Rota responsável por solicitar pedidos.
router.post('/newProduct', async (req, res) => {

    try {

    const { nameProduct, value, description, imageURL, available } = req.body;

    const request = new Product({ 
        nameProduct, value, description, imageURL, available 
    })

    const saveProduct = await request.save();

    res.send(saveProduct)

    } catch (error) {

        res.send(error);

    }
})

// Altera a disponibilidade do produto.
router.post('/updateAvailableProduct', async (req, res) => {

    try {

        const { id } = req.body;

        const product = await Product.findOne({ _id: id })

        if (!product) return res.status(401).json({
            message: 'Produto não enncontrado'
        });

        product.available = !product.available;

        const saveProduct = product.save();

        res.status(200).json({
            message: 'Disponibilidade atualizada'
        });

    } catch (error) {

        res.send(error);

    }
})

// Deleta um produto.
router.post('/deleteProduct', async (req, res) => {

    try {
        const { id } = req.body;

        const product = await Product.findByIdAndRemove(id)

        res.status(200).json({
            message: 'Produto removido com sucesso!.'
        });

    } catch (error) {
        res.send(error);
    }
})

router.get('/listProducts', async (req, res) => {

    try {

        const products = await Product.find({});

        if (!products) return res.status(401).json({
            message: 'Produtos não encontrados!'
        }); 

        res.send(products)

    } catch (error) {

        res.send(error);

    }
})
module.exports = router