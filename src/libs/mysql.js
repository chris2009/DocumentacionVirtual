// import mysql from 'mysql2/promise'
// const executeQuery = async (query, data) => {
//     try {
//         const db = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             port: 3306,
//             database: process.env.DB_DATABASE,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD

//         })
//         const [result] = db.execute(query, data)
//         await db.end();
//         console.log(result)
//         return result
//     } catch (error) {
//         console.log(error)
//         return new Error(error)
//     }
// }
// export default executeQuery;


import mysql from 'mysql2/promise';

const executeQuery = async (query, data) => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: 3306,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        const [rows, fields] = await db.execute(query, data); // Modificado para esperar la ejecución de la consulta

        await db.end();
        
        // console.log(rows); // Imprime los resultados de la consulta
        // console.log(fields); // Imprime los metadatos de los campos de la consulta
        
        return rows; // Retorna los resultados de la consulta
    } catch (error) {
        console.log(error);
        throw error; // Lanza un nuevo error en caso de fallo
    }
};

export default executeQuery;
