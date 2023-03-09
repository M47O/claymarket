import express from 'express'
const router = express.Router()

import productsController from '../controllers/products.js'

router.get('/', productsController.getProducts)

router.get('/:id', productsController.getProductById)

export default router 