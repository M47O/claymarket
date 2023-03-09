import express from 'express'
import colors from 'colors' // Color console.log text
import dotenv from 'dotenv'
import connectDB from './config/database.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.use(express.json())


app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(JSON.stringify(process.env.PAYPAL_CLIENT_ID)))
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV.yellow.bold + ' mode on port ' + PORT.yellow.bold))