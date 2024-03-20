const express = require('express');
const { getKaryashala, getKaryashalaById } = require('../Controllers/KaryashalaController');

const router = express.Router();

router.route("/getallkaryashala").get(getKaryashala);
router.route("/getkaryashalabyid/:id").get(getKaryashalaById);

module.exports = router;
