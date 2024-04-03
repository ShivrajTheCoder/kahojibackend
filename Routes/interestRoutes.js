const express = require('express');
const { getAllInterests, getInterestById } = require('../Controllers/InterestController');

const router = express.Router();

router.route("/getallinterests").get(getAllInterests);
router.route("/getinterestbyid/:id").get(getInterestById);

module.exports = router;
