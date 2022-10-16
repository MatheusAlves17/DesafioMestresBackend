const database = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '#pastel10Queijo',
        database: 'test'
    }
})
module.exports = database