const { pool } = require('../../config/dbConfig');
const mailerService = require('../mailerService/mailerService');
const { productCreatedTemplate } = require('../mailerService/templates/productMailTemplates');

console.log('hola', pool);

const createProduct = async ({ nombre, precio, stock, descripcion }) => {
    try {
        const query = 'INSERT INTO productos (nombre, precio, stock, descripcion) VALUES (?,?,?,?)';
        const [result] = await pool.promise().query(query, [nombre, precio, stock, descripcion]);

        // Envío de correo
        mailerService.transport.sendMail(
            productCreatedTemplate('', 'admin', { nombre, precio, stock, descripcion }),
            (error) => {
                if (error) {
                    console.error('No se pudo enviar el correo', error);
                } else {
                    console.log('Se envió el correo correctamente');
                }
            }
        );

        return result;
    } catch (error) {
        console.error('Error al crear el producto', error);
        throw error;
    }
};

const getAllProducts = async (limit) => {
    try {
        const [rows, fields] = await pool.promise().query('SELECT * FROM productos');

        // Realizar acciones con los resultados

        return rows; // O cualquier cosa que quieras devolver
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

const getProductById = async (pid) => {
    try {
        const [result] = await pool.promise().query('SELECT * FROM productos WHERE Id = ?', [pid]);
        return result[0];
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        throw error;
    }
};

const deleteProductById = async (pid) => {
    try {
        const [result] = await pool.promise().query('DELETE FROM productos WHERE Id = ?', [pid]);

        if (result.affectedRows === 0) {
            return 404;
        }

        return result;
    } catch (error) {
        console.error('Error al eliminar producto por ID:', error);
        throw error;
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
};


/* getAllProducts(2) */

/* 
TAREA:

NOOOO SE OLVIDEN DE EL WHERE

Hacer la funcion obtener producto por ID

HACER LA FUNCION ELIMINAR POR ID 
*/

/* module.exports = {createProduct, getAllProducts, deleteProductById, getProductById} */

/* createProduct({nombre: 'teclado logitech', precio: 50, stock: 30, descripcion: 'teclado funcional mecanico'}) */