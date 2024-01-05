const dbQueryAsync = require('../../config/dbConfig')
const mailerService = require('../mailerService/mailerService')
const { productCreatedTemplate } = require('../mailerService/templates/productMailTemplates')


const createProduct = async ({nombre, precio, stock, descripcion}) =>{
    try{
        const query = 'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?,?,?,?)'
        const result = await dbQueryAsync(query, [nombre, precio, stock, descripcion])
        mailerService.transport.sendMail(
            productCreatedTemplate('', 'admin', {nombre, precio, stock, descripcion}), (error)=>{
            if(error){
                console.error('no se pudo enviar el mail')
            }else{
                console.log('Se envio el mail correctamente')
            }
        })
        return result
    }
    catch(error){
        console.error('error')
        return false
    }
    
}

const getAllProducts = async (limit) => {
    try{
        const query = 'SELECT * FROM productos'
        const result = await dbQueryAsync(query)

        if(limit){
            return result.splice(limit )
        }
        else{
            return result
        }
        
    }
    catch(error){
        console.error(error)
    }
  
}

const getProductById = async (pid) => {
    try{
        const query = `SELECT * FROM productos WHERE Id = (?)`
        const result = await dbQueryAsync(query,[pid])
        return result[0]
    }
    catch(error){
        console.error(error)
        
    }        
}
/* callback hell */

const deleteProductById = async (pid) => {
    try{
        const query = `DELETE FROM productos WHERE Id = (?)`
        const result = await dbQueryAsync(query,[pid])
        if(result.affectedRows == 0){
            return 404
        }
        return result
    }
    catch(error){
        console.error(error)
        return false
    } 
}


/* getAllProducts(2) */

/* 
TAREA:

NOOOO SE OLVIDEN DE EL WHERE

Hacer la funcion obtener producto por ID

HACER LA FUNCION ELIMINAR POR ID 
*/

module.exports = {createProduct, getAllProducts, deleteProductById, getProductById}

/* createProduct({nombre: 'teclado logitech', precio: 50, stock: 30, descripcion: 'teclado funcional mecanico'}) */