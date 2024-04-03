const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getAllInterests, getInterestById } = require("../db/InterestActions");

const exp = module.exports;

exp.getAllInterests = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const interests = await getAllInterests();
        if (interests.length < 1) {
            throw new NotFoundError("No interests found");
        }
        return res.status(200).json({
            interests,
            message: "Interests fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getInterestById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const interest = await getInterestById(id);
        if (!interest) {
            throw new NotFoundError("Interest not found");
        }
        return res.status(200).json({
            interest,
            message: "Interest fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
