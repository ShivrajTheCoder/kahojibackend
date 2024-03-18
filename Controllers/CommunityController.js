const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getCommunity, getCommunityById } = require("../db/CommunityActions");

const exp = module.exports;

exp.getCommunities = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const communities = await getCommunity();
        if (communities.length < 1) {
            throw new NotFoundError("No communities found");
        }
        return res.status(200).json({
            communities,
            message: "Communities fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getCommunityById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const community = await getCommunityById(id);
        if (!community) {
            throw new NotFoundError("Community not found");
        }
        return res.status(200).json({
            community,
            message: "Community fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
