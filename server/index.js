const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Connection
const pool = new Pool({
    user: "postgres",   // Replace with your PostgreSQL username
    host: "localhost",  // Change if using a remote database
    database: "yogaclass", // Your database name
    password: "1234", // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
    
});

pool.connect()
    .then(() => console.log("PostgreSQL Connected..."))
    .catch(err => console.error("Connection error", err));

// API to add data
app.post("/add", async (req, res) => {
    try {
        const { name, email } = req.body;
        const sql = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
        const result = await pool.query(sql, [name, email]);
        res.json({ message: "User added successfully", user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// API to get all users
app.get("/users", async (req, res) => {
    try {
        const sql = "SELECT * FROM users";
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(5000, () => console.log("Server started on port 5000"));
