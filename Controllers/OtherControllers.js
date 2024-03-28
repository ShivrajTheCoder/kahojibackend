const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getBanner, mostPlayedAudio } = require("../db/OtherActions");

const exp = module.exports;

exp.getBanner = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const banner = await getBanner();
        if (banner.length < 1) {
            throw new NotFoundError("No banner found");
        }
        return res.status(200).json({
            banner,
            message: "Banner fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
exp.mostPlayedAudio = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const audios = await mostPlayedAudio();
        if (audios.length < 1) {
            throw new NotFoundError("No audios found");
        }
        return res.status(200).json({
            audios,
            message: "audios fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

