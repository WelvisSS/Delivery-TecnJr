require('./src/setup/db')

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const userRoutes = require('./src/routes/user.routes')
const orderRoutes = require('./src/routes/orders.routes')
const productRoutes = require('./src/routes/products.routes')

const PORT = process.env.PORT || 8000

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)

app.listen(PORT, () => {
    console.log('Escutando na porta: ' + PORT)
})