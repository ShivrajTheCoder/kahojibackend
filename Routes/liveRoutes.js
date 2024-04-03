const express = require('express');
const LiveController = require('../Controllers/LiveController');

const router = express.Router();

router.get("/getAllLiveEvents", LiveController.getAllLiveEvents);
router.get("/getLiveEventById/:id", LiveController.getLiveEventById);
router.get("/getTop5LiveEvents", LiveController.getTop5LiveEvents);
router.get("/getLiveEventsByInterest/:interestId", LiveController.getLiveEventsByInterest);

module.exports = router;
