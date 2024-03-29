const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const getPodcasts = async () => {
    try {
        const query = 'SELECT * FROM podcasts';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        throw error;
    }
};

const getPodcastById = async (id) => {
    try {
        const query = 'SELECT * FROM podcasts WHERE id = ?';
        const rows = await queryPromise(query, [id]);
        if (!rows || rows.length < 1) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('Error fetching ebook by id:', error);
        throw error;
    }
}

const getPodcastsByCategory = async (category_id) => {
    try {
        const query = 'SELECT * FROM podcasts WHERE category_id = ?';
        const rows = await queryPromise(query, [category_id]);
        return rows;
    } catch (error) {
        console.error('Error fetching podcasts by category:', error);
        throw error;
    }
};

module.exports = {
    getPodcasts,
    getPodcastById,
    getPodcastsByCategory // Add getPodcastsByCategory to exports
};

