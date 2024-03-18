const express = require('express');
const { getCommunities, getCommunityById } = require('../Controllers/CommunityController');

const router = express.Router();

router.route("/getallcommunities").get(getCommunities);
router.route("/getcommunitybyid/:id").get(getCommunityById);

module.exports = router;
