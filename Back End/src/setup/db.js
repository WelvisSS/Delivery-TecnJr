const mongoose = require('mongoose')

require('dotenv').config()

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Connect Success")
})

mongoose.connection.on("error", (err) => {
    console.log("error", err)
})