import express from 'express'
const router = express.Router()
import ordersController from '../controllers/orders.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', protect, ordersController.addOrderItems)
router.get('/:id', protect, ordersController.getOrderById)
router.put('/:id/pay', protect, ordersController.updateOrderToPaid)

export default router 