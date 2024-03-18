const express = require('express');
const { getShikhas, getShikhaById } = require('../Controllers/ShikshaController');

const router = express.Router();

router.route("/getallshikhas").get(getShikhas);
router.route("/getshikhabyid/:id").get(getShikhaById);

module.exports = router;
