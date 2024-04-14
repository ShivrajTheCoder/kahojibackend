const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getAllLiveEvents, getLiveEventById, getTop5LiveEvents, getLiveEventsByInterest } = require("../db/LiveActions");

const exp = module.exports;

exp.getAllLiveEvents = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const liveEvents = await getAllLiveEvents();
        if (liveEvents.length < 1) {
            throw new NotFoundError("No live events found");
        }
        return res.status(200).json({
            liveEvents,
            message: "All live events fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getLiveEventById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const liveEvent = await getLiveEventById(id);
        if (!liveEvent) {
            throw new NotFoundError("Live event not found");
        }
        return res.status(200).json({
            liveEvent,
            message: "Live event fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getTop5LiveEvents = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const top5LiveEvents = await getTop5LiveEvents();
        if (top5LiveEvents.length < 1) {
            throw new NotFoundError("No top 5 live events found");
        }
        return res.status(200).json({
            top5LiveEvents,
            message: "Top 5 live events fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getLiveEventsByInterest = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { interestId } = req.params;
        const liveEvents = await getLiveEventsByInterest(interestId);
        if (liveEvents.length < 1) {
            throw new NotFoundError("No live events found for the provided interest");
        }
        return res.status(200).json({
            liveEvents,
            message: "Live events fetched successfully by interest"
        });
    } catch (error) {
        next(error);
    }
});
