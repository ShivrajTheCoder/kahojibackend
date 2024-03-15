const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getAudioBooks, getAudioBooksById } = require("../db/AudioBookActions");

const exp=module.exports

exp.getAudioBooks=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const audios=await getAudioBooks();
        if(audios.lenght<1){
         throw new NotFoundError("No audio book found");
        }
        return res.status(200).json({
            audios,
            message:"Audio book fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getAudioBooksById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const audio=await getAudioBooksById(id);
        if(!audio){
            throw new NotFoundError("audio not found");
        }
        return res.status(200).json({
            audio,
            message:"Audio Books fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})