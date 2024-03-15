const express = require('express')
const { getAllCategories, getCategoryById } = require('../Controllers/CategoryController')

const router = express.Router()

router.route("/getallcategories").get(getAllCategories)
router.route("/getcategorybyid/:id").get(getCategoryById)
module.exports = router