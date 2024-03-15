const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getCategories, getCategoriesById } = require("../db/CategoryActions");

const exp=module.exports

exp.getAllCategories=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const categories=await getCategories();
        if(categories.lenght<1){
         throw new NotFoundError("No audio book found");
        }
        return res.status(200).json({
            categories,
            message:"Audio book fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getCategoryById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const category=await getCategoriesById(id);
        if(!category){
            throw new NotFoundError("category not found");
        }
        return res.status(200).json({
            category,
            message:"Audio Books fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})