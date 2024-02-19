// import mysql from 'mysql2/promise';

// const executeQuery = async (query, data) => {
//     try {
//         const db = await mysql.createPool({
//             host: process.env.DB_HOST,
//             port: 3306,
//             database: process.env.DB_DATABASE,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD
//         });

//         const [rows, fields] = await db.execute(query, data);

//         await db.end();

//         return rows;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };

// export default executeQuery;


import mysql from 'mysql2/promise';

let pool;

const createPool = async () => {
    pool = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: 3306,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
};

const executeQuery = async (query, data) => {
    try {
        if (!pool) {
            await createPool();
        }

        const [rows, fields] = await pool.execute(query, data);

        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

export default executeQuery;