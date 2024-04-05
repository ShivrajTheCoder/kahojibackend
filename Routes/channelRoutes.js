const express = require('express');
const { getAllChannels, getChannelById,  createChannel, getChannelsByCreatorId, getChannelsByInterests } = require('../Controllers/ChannelController');
const router = express.Router();

router.route("/getallchannels").get(getAllChannels);
router.route("/getchannelbyid/:id").get(getChannelById);
router.route("/getchannelsbyinterest/:interestId").get(getChannelsByInterests);
router.route("/createchannel").post(createChannel);
router.route("/getcreatorchannels/:creatorid").get(getChannelsByCreatorId);

module.exports = router;
