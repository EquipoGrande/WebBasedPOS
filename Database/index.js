const { Client } = require('pg')

const client = new Client({
    host: "csce-315-db.engr.tamu.edu",
    user: "csce315950_4user",
    port: 5432,
    password: "4team4",
    database: "csce315950_4db"
});

client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback)
    },
}