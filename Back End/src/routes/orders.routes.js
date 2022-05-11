require("../Schemas/Orders")

const express = require('express')

const router = express.Router()

const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const Order = mongoose.model("order")

router.use(bodyParser.json())

// Adicionar um pedido.
router.post('/newOrder', async (req, res) => {

    try {

        const { idUser, nameOrder, theAmount, subtotal, 
            status, address, payment, description, url 
        } = req.body;

        const request = new Order({
            idUser, nameOrder, theAmount, subtotal, 
            status, address, payment, description, url
        })

        const saveRequest = await request.save();

        res.send(saveRequest)

    } catch(error) {

        res.send(error);
        
    }
})

// Atualiza o status do pedido.
router.post('/updateStatusOrder', async (req, res) => {

    try {

        const { id, status } = req.body;
        
        const result = await Order.findOne({ _id: id });  

        console.log("olá")

        if (!result) return res.status(401).json({
            message: 'Pedido não encontrado'
        });

        result.status = status

        const SaveOrder = await result.save();

        res.status(200).json({
            message: 'Status Alterado.'
        });

    } catch(error) {

        res.send(error);

    }

})
// Finaliza um pedido depois que ele foi concluido.
router.post('/finishOrder', async (req, res) => {

    try {

        const { id } = req.body;

        const result = await Order.findByIdAndRemove(id);

        res.status(200).json({
            message: 'Pedido finalizado com sucesso!.'
        });

    } catch(error) {

        res.send(error);

    }
})

// Lista todas as ordens do usuário.
router.post('/myOrder', async (req, res) => {

    try {
        const { idUser } = req.body;

        const Orders = await Order.find({ idUser });
        
        if (!Orders) throw 409; 
        
        res.status(200).json({ Orders });

    } catch (error) {

        res.send(error);

    }
})

// Lista todas as ordens do app.
router.get('/allOrders', async (req, res) => {

    try {

        const Orders = await Order.find({});

        res.status(200).json(Orders);

    } catch(error) {

        res.send(error);

    }
})


module.exports = router;