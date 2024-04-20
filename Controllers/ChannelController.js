const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError, BadRequestError } = require("../Utils/CustomErrors");
const { getAllChannels, getChannelById, getChannelsByCategory, createChannel, getChannelsByCreatorId, getChannelsByInterests, updateChannelApprovalStatus, getAllUnapprovedChannels } = require("../db/ChannelActions");

const exp = module.exports;

exp.getAllChannels = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const channels = await getAllChannels();
        if (channels.length < 1) {
            throw new NotFoundError("No channels found");
        }
        return res.status(200).json({
            channels,
            message: "Channels fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getChannelById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const channel = await getChannelById(id);
        if (!channel) {
            throw new NotFoundError("Channel not found");
        }
        return res.status(200).json({
            channel,
            message: "Channel fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getChannelsByInterests = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { interestId } = req.params;
        const channels = await getChannelsByInterests(interestId);
        if (channels.length < 1) {
            throw new NotFoundError("No channels found for the provided category");
        }
        return res.status(200).json({
            channels,
            message: "Channels fetched successfully by category"
        });
    } catch (error) {
        next(error);
    }
});

exp.createChannel = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { name, description, creatorid, isApproved=0, interest_id } = req.body; // Add interest_id to destructuring

        // Check if required fields are provided
        if (!name || !description || !creatorid || !interest_id) { // Check if interest_id is provided
            return res.status(400).json({
                message: "Bad request, all fields are mandatory"
            });
        }

        // Create channel
        const channelId = await createChannel({ name, description,owner_id: creatorid, isApproved, interest_id }); // Pass interest_id to createChannel

        // Return success response
        return res.status(201).json({
            channelId,
            message: "Channel created successfully"
        });
    } catch (error) {
        next(error);
    }
});


exp.getChannelsByCreatorId = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { creatorid } = req.params;
        const channels = await getChannelsByCreatorId(creatorid);
        if (channels.length < 1) {
            throw new NotFoundError("No channels found for the provided creatorid");
        }
        return res.status(200).json({
            channels,
            message: "Channels fetched successfully by creatorid"
        });
    } catch (error) {
        next(error);
    }
});
exp.updateChannelApproval = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { channelId } = req.params;
        const { isApproved } = req.body;

        // Check if required fields are provided
        if (!isApproved || !channelId) {
            return res.status(400).json({
                message:"Bad request, all fields are mandatory"
            })
        }

        // Update channel approval status
        await updateChannelApprovalStatus(channelId, isApproved);

        // Return success response
        return res.status(200).json({
            message: "Channel approval status updated successfully"
        });
    } catch (error) {
        next(error);
    }
});
exp.getAllUnapprovedChannels = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const unapprovedChannels = await getAllUnapprovedChannels(); // Fetch all unapproved channels
        return res.status(200).json({
            unapprovedChannels,
            message: "Unapproved channels fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});