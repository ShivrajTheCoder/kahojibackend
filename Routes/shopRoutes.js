const express = require('express')
const { getShop, getShopById, placeOrder, getAllUserOrders } = require('../Controllers/ShopController')

const router = express.Router()

router.route("/getshop").get(getShop)
router.route("/getshopbyid/:id").get(getShopById)
router.route("/placeorder")
    .post(placeOrder)

router.route("/getuserorders/:userId")
    .get(getAllUserOrders)
module.exports = router