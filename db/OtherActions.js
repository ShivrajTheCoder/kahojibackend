const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const getBanner = async () => {
    try {
        const query = 'SELECT * FROM banner';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching banner:', error);
        throw error;
    }
};

const mostPlayedAudio=async()=>{
    try {
        const query = 'SELECT * FROM audios ORDER BY number_of_views DESC LIMIT 4';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching banner:', error);
        throw error;
    }
}



module.exports = {
    getBanner,
    mostPlayedAudio
};
