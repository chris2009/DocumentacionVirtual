import mysql from 'mysql2/promise';

const executeQuery = async (query, data) => {
    try {
        const db = await mysql.createPool({
            host: process.env.DB_HOST,
            port: 3306,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        const [rows, fields] = await db.execute(query, data);

        await db.end();

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default executeQuery;
