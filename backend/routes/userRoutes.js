import express from 'express'
const router = express.Router()
import userController from '../controllers/users.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', userController.registerUser)
router.post('/login', userController.authUser)
router.get('/profile', protect, userController.getUserProfile)
router.put('/profile', protect, userController.updateUserProfile)

export default router