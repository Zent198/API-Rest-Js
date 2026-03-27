import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
});


pool.getConnection()
    .then(connection => {
        console.log("Conectado a MySQL - Pool listo");
        connection.release();
    })
    .catch(err => {
        console.error("Error conectando a la base de datos:", err.message);
    });

    export default pool;