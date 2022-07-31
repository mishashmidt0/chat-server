const pg = require('pg');
require('dotenv').config();

const Pool = pg.Pool

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
});

pool.connect();

const tableMessages= ` 
 create TABLE messages(
   id SERIAL PRIMARY KEY,
   from VARCHAR(200),
   text VARCHAR(200),
   createdAt DATE,
);
 `;


pool.query(tableMessages, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Table is successfully created');
});

module.exports = pool