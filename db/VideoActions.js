const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");
const connection = mysql.createConnection(dbConfig);

// Promisify connection methods
const queryPromise = promisify(connection.query).bind(connection);
const connectPromise = promisify(connection.connect).bind(connection);
const endPromise = promisify(connection.end).bind(connection);

const getVideos = async () => {
    try {
        await connectPromise();
        const query = 'SELECT * FROM videos';
        const rows = await queryPromise(query);
        await endPromise();
        return rows;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};

const getVidById = async (id) => {
    try {
        await connectPromise();
        const query = 'SELECT * FROM videos WHERE id = ?';
        const rows = await queryPromise(query, [id]);
        await endPromise();
        if(!rows || rows.lenth<1){
            return null;
        }
        return rows[0];
    }
    catch (error) {
        console.error('Error fetching video by id:', error);
        throw error;
    }
}

module.exports = {
    getVideos,
    getVidById
};
