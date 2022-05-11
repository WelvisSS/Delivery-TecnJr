const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        idUser: {
            type: String,
            required: true,
        },

        nameOrder: {
            type: String,
            required: true
        },

        theAmount: {
            type: Number,
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        payment: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        url: {
            type: String,
            required: true,
        }
    }
)

mongoose.model('order', schema)