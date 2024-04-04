const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getPathshala, getPathshalaById } = require("../db/PathshalaActions");

const exp = module.exports;

exp.getPathshala = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const pathshalas = await getPathshala();
        // console.log(pathshalas);
        if (pathshalas?.length < 1 || !pathshalas) {
            throw new NotFoundError("No pathshala found");
        }
        return res.status(200).json({
            pathshalas,
            message: "Pathshalas fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getPathshalaById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const pathshala = await getPathshalaById(id);
        if (!pathshala) {
            throw new NotFoundError("Pathshala not found");
        }
        return res.status(200).json({
            pathshala,
            message: "Pathshala fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
