const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getAllChannels, getChannelById, getChannelsByCategory } = require("../db/ChannelActions");

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
