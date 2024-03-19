const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const getUsers = async () => {
    try {
        const query = 'SELECT * FROM users';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const query = 'SELECT * FROM users WHERE id = ?';
        const rows = await queryPromise(query, [id]);
        if (!rows || rows.length < 1) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserById
};
