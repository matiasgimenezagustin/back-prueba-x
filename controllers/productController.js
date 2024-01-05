const { getProductById, createProduct, getAllProducts, deleteProductById } = require("../services/products/serviceProduct")




const getProductByIdController = async (req, res) =>{
    const {pid} = req.params
    const result = await getProductById(pid)
    if(!result){
        res.status(500).json({message: 'error'})
    }
    else if(result.length == 0){
        res.status(404).json({message: 'ERROR: Not found'})
    }
    else{
        res.status(200).json({message: 'correcto', product: result})
    }
    
}

const postProductController = async (req, res) =>{
    console.log(req.body)
    const {nombre, precio, stock, descripcion} = req.body

    if (!nombre || !precio || !stock || !descripcion) {
        return res.status(404).json({message: 'Bad request'})
    }
    const result = await createProduct({nombre, precio, descripcion, stock})
    if(!result){
        return res.status(500).json({message: 'Internal server error'})
    }
    else{
        return res.status(201).json({message: 'Product created successfully', product: result[0]})
    }
}

const getAllProductsController = async (req, res) =>{
    const result = await getAllProducts()
    
    if (!result){
        res.status(500).json({message: 'internal server error'})
    }
    else{
        res.status(200).json({message: 'Here are the products', products: result})
    }
}

const deleteProductController = async (req, res) =>{
    const {pid} = req.params

    const result = await deleteProductById(pid)
    if(result == 404){
        res.status(404).json({message: 'product id not found'})
    }
    else if (!result){
        res.status(500).json({message: 'internal server error'})
    }
    else{
        res.status(200).json({message: 'product removed successfully'})
    }
}

module.exports = {getProductByIdController, getAllProductsController, postProductController, deleteProductController}