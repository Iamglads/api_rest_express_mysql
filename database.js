const mysql = require('mysql')
const databaseConfig = require('./db.config')

// connexion 
const connection = mysql.createConnection({
    host: databaseConfig.HOST,
    user: databaseConfig.USER,
    password: databaseConfig.PASSWORD,
    database: databaseConfig.DATABASE

})

connection.connect(error => {
    if(error) throw error
    else {
        console.log('Connected to the database!') 
    }
    
})


module.exports = connection