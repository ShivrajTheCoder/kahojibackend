const express = require('express');
const { getBanner } = require('../Controllers/OtherControllers');

const router = express.Router();

router.route("/getbanner").get(getBanner);


module.exports = router;
