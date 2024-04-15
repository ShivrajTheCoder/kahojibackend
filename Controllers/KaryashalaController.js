const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getKaryashala, getKaryashalaById, addKaryashala } = require("../db/KaryashalaActions");

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
exp.addKaryashala = RouterAsyncErrorHandler(async (req, res, next) => {
    if(!req.files){
        return res.status(400).json({ error: "All fields are required" });
    }
    // console.log(req.files);
    const {thumbnail, media} = req.files;
    if(!thumbnail || !media){
        return res.status(400).json({ error: "All fields are required" });
    }
    const thumbnailName = "/images/karyashala/"+thumbnail[0].filename;
    const mediaName = "/images/karyashala/"+media[0].filename;
    const { type, title, description } = req.body;
    if(!type || !title || !description){
        return res.status(400).json({ error: "All fields are required" });
    }
    let isAudio=true;
    if(type !== "audio"){
        isAudio=false;
    }
    console.log(req.body);
    
    try {
        
        // Check if required fields are provided
        if (!isAudio || !mediaName || !title || !description || !thumbnailName) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Call the addKaryashala function from database actions
        const karyashalaId = await addKaryashala(isAudio, mediaName, title, description, thumbnailName);

        // Return success response
        return res.status(201).json({
            karyashalaId,
            message: "Karyashala added successfully"
        });
    } catch (error) {
        // Forward error to error handler middleware
        next(error);
    }
});