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
        // Extract the category_id from the request parameters
        const { category_id } = req.params;
        
        // Call the function to get podcasts by category ID from the database
        const podcasts = await getPodcastsByCategory(category_id);
        console.log(podcasts,category_id);
        // If no podcasts are found, throw a NotFoundError
        if (podcasts?.length < 1) {
            throw new NotFoundError("No podcasts found for this category");
        }

        // Send the response with the retrieved podcasts
        return res.status(200).json({
            podcasts,
            message: "Podcasts fetched successfully"
        });
    } catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
});