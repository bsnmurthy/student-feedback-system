const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.log("Database Connection Failed", err);
  } else {
    console.log("Database Connected Successfully");
  }
});

module.exports = pool;