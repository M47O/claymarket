import Product from '../models/Product.js'

const productsController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()
            res.json(products)

        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)

            if (product) {
                res.json(product)
            } else {
                throw new Error('Product not found')
            }
        } catch (error) {
            console.error(`getProductById Error: `.red.bold + `${error}`.red)
            res.status(404).json({ message: 'Product not found' })
        }
    }
}
export default productsController