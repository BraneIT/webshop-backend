const express = require('express')
const cors = require('cors');
const app = express()

app.use(cors());


app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })
})

app.listen(5000, () => { console.log("server started on port 5000"); })

const { Pool } = require('pg');

const pool = new Pool({
    user: 'Branislav',
    password: 'Mikser55',
    host: 'localhost',
    port: 5432, // Default PostgreSQL port
    database: 'webshop',
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the database');
    release(); // Release the client back to the pool
});

app.get('/api/products', (req, res) => {
    pool.query('SELECT * FROM products', (err, result) => {
        if (err) {
            console.error('Error retrieving products: ', err);
            res.status(500).json({ error: 'An error occurred' });
            return;
        }
        res.json(result.rows);
    });
});