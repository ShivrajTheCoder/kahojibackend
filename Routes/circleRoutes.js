const express = require('express');
const { getCircles, getCirclesById } = require('../Controllers/CircleController');

const router = express.Router();

router.route("/getallcircles").get(getCircles);
router.route("/getcirclebyid/:id").get(getCirclesById);

module.exports = router;
