const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getCategories, getCategoriesById, getOriginalCategoriesById, getOriginalCategories } = require("../db/CategoryActions");

const exp = module.exports;

exp.getAllCategories = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const categories = await getCategories();
        if (categories.length < 1) {
            throw new NotFoundError("No categories found");
        }
        return res.status(200).json({
            categories,
            message: "Categories fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getCategoryById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await getCategoriesById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        return res.status(200).json({
            category,
            message: "Category fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
exp.getAllOriginals = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const originals = await getOriginalCategories();
        if (originals.length < 1) {
            throw new NotFoundError("No originals found");
        }
        return res.status(200).json({
            originals,
            message: "Originals fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getOriginalById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const original = await getOriginalCategoriesById(id);
        if (!original) {
            throw new NotFoundError("Original not found");
        }
        return res.status(200).json({
            original,
            message: "Original fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});
module.exports = exp;
