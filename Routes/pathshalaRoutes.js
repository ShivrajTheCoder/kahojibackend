const express = require('express');
const { getPathshala, getPathshalaById } = require('../Controllers/pathshalaController');


const router = express.Router();

router.route("/getallpathshala").get(getPathshala);
router.route("/getpathshalabyid/:id").get(getPathshalaById);

module.exports = router;
