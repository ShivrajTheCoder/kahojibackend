const { RouterAsyncErrorHandler } = require("../Middlewares/ErrorHandlerMiddleware");
const { NotFoundError } = require("../Utils/CustomErrors");
const { getShop, getShopById, placeOrder, getUserOrders, getShopCategories } = require("../db/ShopActions");
const { getUserById } = require("../db/UserActions");

const exp = module.exports

exp.getShop = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const shops = await getShop();
        if (shops.lenght < 1) {
            throw new NotFoundError("No shops found");
        }
        return res.status(200).json({
            shops,
            message: "Shop fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})
exp.getShopCategories = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const categories = await getShopCategories();
        if (categories.lenght < 1) {
            throw new NotFoundError("No categories");
        }
        return res.status(200).json({
            categories,
            message: "Categories fetched successfully"
        })
    } catch (error) {
        next(error);
    }
})

exp.getShopById = RouterAsyncErrorHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const shop = await getShopById(id);
        if (!shop) {
            throw new NotFoundError("Shop not found");
        }
        return res.status(200).json({
            shop,
            message: "Shop fetched successfully"
        })
    }
    catch (error) {
        next(error);
    }
})

exp.placeOrder = RouterAsyncErrorHandler(async (req, res, next) => {
    const { userId, itemId, } = req.body;
    try {
        const user=await getUserById(userId);
        const item=await getShopById(itemId);
        if(!user){
            throw new NotFoundError("User not found");
        }
        if(!item){
            throw new NotFoundError("Item not found");
        }
        const resp=await placeOrder(userId, itemId);
        return res.status(200).json({
            resp,
            message: "Order placed successfully"
        })
    }
    catch (error) {
        next(error);
    }
})


exp.getAllUserOrders=RouterAsyncErrorHandler(async(req,res,next)=>{

    const {userId}=req.params;
    try{
        const user=await getUserOrders(userId);
        if(!user){
            throw new NotFoundError("User not found");
        }
        const orders=await getUserOrders(userId);
        return res.status(200).json({
            orders,
            message:"Orders fetched successfully"
        })
    }
    catch(error){
        next(error);
    }
})