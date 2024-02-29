import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const executeQuery = async (query, data) => {
    try {
        const [rows, fields] = await pool.execute(query, data);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

export default executeQuery;
