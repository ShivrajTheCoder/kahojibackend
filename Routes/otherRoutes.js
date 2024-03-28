const express = require('express');
const { getBanner, mostPlayedAudio } = require('../Controllers/OtherControllers');

const router = express.Router();

router.route("/getbanner").get(getBanner);
router.route("/gettopaudios").get(mostPlayedAudio);


module.exports = router;
