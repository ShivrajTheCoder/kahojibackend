const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getKaryashala, getKaryashalaById } = require("../db/KaryashalaActions");

const exp = module.exports;

exp.getKaryashala = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const karyashalas = await getKaryashala();
        if (karyashalas.length < 1) {
            throw new NotFoundError("No karyashala found");
        }
        return res.status(200).json({
            karyashalas,
            message: "Karyashala fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getKaryashalaById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const karyashala = await getKaryashalaById(id);
        if (!karyashala) {
            throw new NotFoundError("Karyashala not found");
        }
        return res.status(200).json({
            karyashala,
            message: "Karyashala fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
