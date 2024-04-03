const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const getAllChannels = async () => {
    try {
        const query = 'SELECT * FROM channels';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw error;
    }
};

const getChannelById = async (id) => {
    try {
        const query = 'SELECT * FROM channels WHERE id = ?';
        const rows = await queryPromise(query, [id]);
        if (!rows || rows.length < 1) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('Error fetching channel by id:', error);
        throw error;
    }
};

const getChannelsByCategory = async (categoryId) => {
    try {
        const query = 'SELECT * FROM channels WHERE category_id = ?';
        const rows = await queryPromise(query, [categoryId]);
        return rows;
    } catch (error) {
        console.error('Error fetching channels by category:', error);
        throw error;
    }
};

const createChannel = async (channelData) => {
    try {
        const query = 'INSERT INTO channels (name, description, creatorid) VALUES (?, ?, ?)';
        const result = await queryPromise(query, [
            channelData.name,
            channelData.description,
            channelData.creatorid,
        ]);
        // Return the ID of the newly inserted row
        return result.insertId;
    } catch (error) {
        console.error('Error creating channel:', error);
        throw error;
    }
};

const getChannelsByCreatorId = async (creatorid) => {
    try {
        const query = 'SELECT * FROM channels WHERE creatorid = ?';
        const rows = await queryPromise(query, [creatorid]);
        return rows;
    } catch (error) {
        console.error('Error fetching channels by creatorid:', error);
        throw error;
    }
};

module.exports = {
    getAllChannels,
    getChannelById,
    getChannelsByCategory,
    createChannel,
    getChannelsByCreatorId
};

