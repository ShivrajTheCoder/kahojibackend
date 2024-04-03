const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError, BadRequestError } = require("../Utils/CustomErrors");
const { getAllChannels, getChannelById, getChannelsByCategory, createChannel, getChannelsByCreatorId } = require("../db/ChannelActions");

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

exp.getChannelsByCategory = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const channels = await getChannelsByCategory(categoryId);
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
        const { name, description, creatorid, isApproved } = req.body;
        
        // Check if required fields are provided
        if (!name || !description || !creatorid) {
            throw new BadRequestError("Name, description, and creatorid are required");
        }
        
        // Create channel
        const channelId = await createChannel({ name, description, creatorid, isApproved });
        
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
