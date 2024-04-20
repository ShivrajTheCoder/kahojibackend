const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getPodcasts, getPodcastById, getPodcastsByCategory, addPodcast, getOriginalPodcasts } = require("../db/PodcastActions");
const { deleteItemById } = require("../db/deleteaction");
const backpath=process.env.HOSTED;
const exp = module.exports

exp.getPodcasts = RouterAsyncErrorHandler(async (req, res, next) => {
    console.log("i was called")
    try {
        const podcasts = await getPodcasts();
        if (podcasts.lenght < 1) {
            throw new NotFoundError("No podcasts found");
        }
        return res.status(200).json({
            podcasts,
            message: "Videos fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getPodcastsById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const podcast = await getPodcastById(id);
        if (!podcast) {
            throw new NotFoundError("Video not found");
        }
        return res.status(200).json({
            podcast,
            message: "Video fetched successfully"
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

exp.addPodcast = RouterAsyncErrorHandler(async (req, res, next) => {
    const { authorId, name, description,  isVideo, categoryId } = req.body;
    // console.log(req.files);
    if(!req.files){
        return res.status(400).json({
            message:"No file uploaded"
        })
    }
    const {thumbnail,mediaFile}=req.files;
    if(!thumbnail || !mediaFile){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    const thumbnailPath=backpath+"/images/podcasts/"+thumbnail[0].filename;
    const mediaFilePath=backpath+"/images/podcasts/"+mediaFile[0].filename;
    if (!authorId || !name || !description || !thumbnailPath || !isVideo || !categoryId || !mediaFilePath) {
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    try {
        // Add podcast
        const podcastId = await addPodcast(authorId, name, description, mediaFilePath, isVideo , categoryId, thumbnailPath);
        return res.status(201).json({
            id: podcastId,
            message: "Podcast added successfully"
        });
    } catch (error) {
        next(error);
    }
});
exp.deletePodcastById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await deleteItemById("podcasts",id);
        if (!deleted) {
            throw new NotFoundError("podcasts not found");
        }
        return res.status(200).json({
            message: "podcasts deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

exp.getOriginalPodcasts = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const originalPodcasts = await getOriginalPodcasts();
        if (originalPodcasts.length < 1) {
            throw new NotFoundError("No original podcasts found");
        }
        return res.status(200).json({
            originalPodcasts,
            message: "Original podcasts fetched successfully"
        });
    } catch (error) {
        next(error);
    }
});