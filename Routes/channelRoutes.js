const express = require('express');
const { getAllChannels, getChannelById, getChannelsByCategory, createChannel } = require('../Controllers/ChannelController');
const router = express.Router();

router.route("/getallchannels").get(getAllChannels);
router.route("/getchannelbyid/:id").get(getChannelById);
router.route("/getchannelsbycategory/:categoryId").get(getChannelsByCategory);
router.route("/createchannel").post(createChannel);

module.exports = router;
