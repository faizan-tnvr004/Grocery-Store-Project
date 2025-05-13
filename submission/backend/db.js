require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,           // Your SQL Server username
    password: process.env.DB_PASSWORD,   // Your SQL Server password
    server: process.env.DB_SERVER,      // Your SQL Server hostname or IP addressgit
    database: process.env.DB_NAME,       // Your database name
    options: {
        encrypt: false,                   
        trustServerCertificate: true      // Required for local development
    }
};

// Create a connection pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };
