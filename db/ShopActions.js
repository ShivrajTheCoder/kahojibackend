const mysql = require('mysql');
const { promisify } = require('util');
const dbConfig = require("./dbConfig");

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Promisify pool methods
const queryPromise = promisify(pool.query).bind(pool);

const getShop = async () => {
    try {
        const query = 'SELECT * FROM shop';
        const rows = await queryPromise(query);
        return rows;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
};

const getShopById = async (id) => {
    try {
        const query = 'SELECT * FROM shop WHERE id = ?';
        const rows = await queryPromise(query, [id]);
        if (!rows || rows.length < 1) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error('Error fetching video by id:', error);
        throw error;
    }
}


const placeOrder = async (userId, itemId) => {
    try {
        const query = 'INSERT INTO orders (userid, paymentstatus, item_id) VALUES (?, ?, ?)';
        const result = await queryPromise(query, [userId, 0, itemId]);
        console.log(result);
        return result.insertId; // Return the ID of the inserted order
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}


const getUserOrders = async (userId) => {
    try {
        const query = 'SELECT * FROM orders WHERE userid = ?';
        const rows = await queryPromise(query, [userId]);
        return rows;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
}

module.exports = {
    getShop,
    getShopById,
    placeOrder,
    getUserOrders
};
