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

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión establecida con éxito a la base de datos');

        // Puedes realizar una consulta de prueba aquí, por ejemplo:
        connection.query('SELECT 1 + 1 AS result', (queryErr, results) => {
            if (queryErr) {
                console.error('Error al realizar la consulta:', queryErr);
            } else {
                console.log('Resultado de la consulta:', results);
            }

            // Liberar la conexión después de realizar la consulta
            connection.release();
        });
    }
});



module.exports = {pool};
