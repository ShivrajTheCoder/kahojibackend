const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getEbooks, getEbooksById } = require("../db/EbooksActions");

const exp=module.exports

exp.getAllEbooks=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const ebooks=await getEbooks();
        if(ebooks.lenght<1){
         throw new NotFoundError("No audio book found");
        }
        return res.status(200).json({
            ebooks,
            message:"Audio book fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getEbookById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const ebook=await getEbooksById(id);
        if(!ebook){
            throw new NotFoundError("ebook not found");
        }
        return res.status(200).json({
            ebook,
            message:"Audio Books fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})