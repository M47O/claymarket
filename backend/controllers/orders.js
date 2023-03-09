import Order from '../models/Order.js'

const ordersController = {
    addOrderItems: async (req, res) => {
        try {
            const {
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            } = req.body

            if (orderItems && orderItems == 0) {
                throw new Error('No order items')
            } else {
                const order = new Order({
                    user: req.user._id,
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice
                })

                const createdOrder = order.save()
                res.status(201).json(order)
            }

        } catch (error) {
            res.status(400).json({ message: 'No order items' })
        }
    },

    getOrderById: async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        try {
            if (order) {
                res.json(order)
            } else {
                throw new Error('Order not found')
            }
        } catch (error) {
            res.status(404).json(error)
        }

    },
    updateOrderToPaid: async (req, res) => {
        const order = await Order.findById(req.params.id)
        try {
            if (order) {
                order.isPaid = truestatus
                order.paidAt = Date.now()
                order.paymentResult = {
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.payer.email_address
                }

                const updatedOrder = await order.save()

                res.json(updatedOrder)
            } else {
                throw new Error('Order not found')
            }
        } catch (error) {
            res.status(404).json(error)
        }

    }

}



export default ordersController