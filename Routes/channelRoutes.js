const express = require('express');
const { getAllChannels, getChannelById,  createChannel, getChannelsByCreatorId, getChannelsByInterests, updateChannelApproval } = require('../Controllers/ChannelController');
const adminAuthenticateToken = require('../Middlewares/AdminAuthMiddleware');
const router = express.Router();

router.route("/getallchannels").get(getAllChannels);
router.route("/getchannelbyid/:id").get(getChannelById);
router.route("/getchannelsbyinterest/:interestId").get(getChannelsByInterests);
router.route("/createchannel").post(createChannel);
router.route("/getcreatorchannels/:creatorid").get(getChannelsByCreatorId);
router.route("/approvechannel/:channelId").put(adminAuthenticateTokens, updateChannelApproval);
module.exports = router;
