require('dotenv').config()
const mysql = require('mysql2')

//Creates the connection and then exports it for use using a .env file for credentials
const connection = mysql.createConnection({
    host: 'localhost', 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
})





module.exports = connection