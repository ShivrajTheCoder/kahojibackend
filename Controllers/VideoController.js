const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getVideos, getVidById } = require("../db/VideoActions");
const exp=module.exports

exp.getVideos=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const videos=await getVideos();
        if(videos.lenght<1){
         throw new NotFoundError("No videos found");
        }
        return res.status(200).json({
            videos,
            message:"Videos fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getVideosById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const video=await getVidById(id);
        if(!video){
            throw new NotFoundError("Video not found");
        }
        return res.status(200).json({
            video,
            message:"Video fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})