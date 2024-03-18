const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getCircles, getCirclesById } = require("../db/CircleActions");

const exp = module.exports;

exp.getCircles = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const circles = await getCircles();
        if (circles.length < 1) {
            throw new NotFoundError("No circles found");
        }
        return res.status(200).json({
            circles,
            message: "Circles fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getCirclesById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const circle = await getCirclesById(id);
        if (!circle) {
            throw new NotFoundError("Circle not found");
        }
        return res.status(200).json({
            circle,
            message: "Circle fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
