const express = require('express')
const { getProductByIdController, getAllProductsController, postProductController, deleteProductController} = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

const productRouter = express.Router()

productRouter.get('/', authMiddleware, getAllProductsController)

productRouter.post('/', postProductController )

productRouter.delete('/:pid', deleteProductController)

productRouter.get("/:pid", getProductByIdController)





module.exports = productRouter



