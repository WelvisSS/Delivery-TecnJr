const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nameProduct: {
            type: String,
            required: true,
        },

        value: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            require: true
        },
        available: {
            type: Boolean,
            require: true
        }
    }
)

mongoose.model('product', schema)