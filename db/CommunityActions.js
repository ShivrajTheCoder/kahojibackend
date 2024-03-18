const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const getCommunity = async () => {
    try {
        const query = 'SELECT * FROM community';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching community:', error);
        throw error;
    }
};

const getCommunityById = async (id) => {
    try {
        const query = 'SELECT * FROM community WHERE id = ?';
        const rows = await queryPromise(query, [id]);
        if (!rows || rows.length < 1) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('Error fetching community by id:', error);
        throw error;
    }
}

module.exports = {
    getCommunity,
    getCommunityById
};
