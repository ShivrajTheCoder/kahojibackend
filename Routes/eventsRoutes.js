const express = require('express');
const { getAllEvents, getEventsById } = require('../Controllers/EventsController');

const router = express.Router();

router.route("/getallevents").get(getAllEvents);
router.route("/getcommunitybyid/:id").get(getEventsById);

module.exports = router;
