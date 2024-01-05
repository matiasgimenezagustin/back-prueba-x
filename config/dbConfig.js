const mysql = require('mysql2');
/* const fs = require('fs');
const util = require('util');
 */
console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Configuración del pool de conexiones
const pool =   mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Manejo de errores
pool.on('error', (error) => {
    console.error('Error en el pool de MySQL:', error);
});


// Conexión al pool
/* const getConnectionAsync = util.promisify(pool.getConnection).bind(pool); */

// Ejemplo de consulta con el pool de conexiones
/* (async () => {
    try {
        const connection = await getConnectionAsync();
        console.log('Conexión al pool obtenida con éxito.');

        // Realizar consultas o cualquier operación con la conexión

        // Devolver la conexión al pool cuando hayas terminado
        connection.release();
        console.log('Conexión al pool liberada.');
    } catch (error) {
        console.error('Error al obtener la conexión del pool:', error);
    }
})();

// Función para realizar consultas con el pool
const dbQueryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}; */

module.exports = {pool};
