const express = require('express');
const { getAllInterests, getInterestById, addInterest } = require('../Controllers/InterestController');

const router = express.Router();

// Get all interests
router.route("/getallinterests").get(getAllInterests);

// Get interest by ID
router.route("/getinterestbyid/:id").get(getInterestById);

// Add interest
router.route("/addinterest").post(addInterest);

module.exports = router;
