const {pool} = require('../../config/dbConfig')
const mailerService = require('../mailerService/mailerService')
const { productCreatedTemplate } = require('../mailerService/templates/productMailTemplates')

console.log('hola', pool)
const createProduct = async ({nombre, precio, stock, descripcion}) =>{
    try{
        const query = 'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?,?,?,?)'
        const result = await pool(query, [nombre, precio, stock, descripcion])
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
/* 
const getAllProducts = async (limit) => {
    try{
        const query = 'SELECT * FROM productos'
        const result = await pool(query)

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
 */
async function getAllProducts() {
    try {
        const connection = await pool.promise().getConnection(); // Obtener conexión del pool

        const [rows, fields] = await connection.query('SELECT * FROM productos');

        // Realizar acciones con los resultados

        connection.release(); // Liberar la conexión al pool
        return rows; // O cualquier cosa que quieras devolver
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
}

const getProductById = async (pid) => {
    try{
        const query = `SELECT * FROM productos WHERE Id = (?)`
        const result = await pool(query,[pid])
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
        const result = await pool(query,[pid])
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