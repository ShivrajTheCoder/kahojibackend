const express = require('express')
const { getShop, getShopById } = require('../Controllers/ShopController')

const router = express.Router()

router.route("/getshop").get(getShop)
router.route("/getshopbyid/:id").get(getShopById)
module.exports = router