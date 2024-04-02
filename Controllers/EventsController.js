const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getAllEvents, getEventById } = require("../db/EventsActions");

const exp=module.exports

exp.getAllEvents=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const events=await getAllEvents();
        if(events.lenght<1){
         throw new NotFoundError("No audio book found");
        }
        return res.status(200).json({
            events,
            message:"Audio book fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getEventsById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const event=await getEventById(id);
        if(!event){
            throw new NotFoundError("event not found");
        }
        return res.status(200).json({
            event,
            message:"Audio Books fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})