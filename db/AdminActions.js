const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const adminLogin = async (email, password) => {
    try {
        const query = 'SELECT * FROM admin WHERE email = ? AND password = ?';
        const rows = await queryPromise(query, [email, password]);
        if (!rows || rows.length < 1) {
            return null;
        }
        return rows[0]; // Return the admin object
    } catch (error) {
        console.error('Error logging in admin:', error);
        throw error;
    }
};

module.exports = {
    adminLogin
};
