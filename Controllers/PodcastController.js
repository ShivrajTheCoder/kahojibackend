const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getPodcasts, getPodcastById, getPodcastsByCategory } = require("../db/PodcastActions");

const exp=module.exports

exp.getPodcasts=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const podcasts=await getPodcasts();
        if(podcasts.lenght<1){
         throw new NotFoundError("No podcasts found");
        }
        return res.status(200).json({
            podcasts,
            message:"Videos fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getPodcastsById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const podcast=await getPodcastById(id);
        if(!podcast){
            throw new NotFoundError("Video not found");
        }
        return res.status(200).json({
            podcast,
            message:"Video fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
}) 
exp.getPodcastsByCategoryId = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { category_id } = req.params;
        const podcasts = await getPodcastsByCategory(category_id);
        
        if (podcasts?.length < 1) {
            throw new NotFoundError("No podcasts found for this category");
        }
        return res.status(200).json({
            podcasts,
            message: "Podcasts fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});