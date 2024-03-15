const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getShop, getShopById } = require("../db/ShopActions");

const exp=module.exports

exp.getShop=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const shops=await getShop();
        if(shops.lenght<1){
         throw new NotFoundError("No shops found");
        }
        return res.status(200).json({
            shops,
            message:"Shop fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getShopById=RouterAsyncErrorHandler(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const shop=await getShopById(id);
        if(!shop){
            throw new NotFoundError("Shop not found");
        }
        return res.status(200).json({
            shop,
            message:"Shop fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})