const express = require('express');
const { getCommunities, getCommunityById, addCommunity } = require('../Controllers/CommunityController');

const router = express.Router();

router.route("/getallcommunities").get(getCommunities);
router.route("/getcommunitybyid/:id").get(getCommunityById);
router.route("/addcommunity").post(addCommunity);
module.exports = router;
