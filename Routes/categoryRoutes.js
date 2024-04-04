const express = require('express')
const { getAllCategories, getCategoryById, getAllOriginals, getOriginalById } = require('../Controllers/CategoryController')

const router = express.Router()

router.route("/getallcategories").get(getAllCategories)
router.route("/getalloriginals").get(getAllOriginals)
router.route("/getcategorybyid/:id").get(getCategoryById)
router.route("/getalloriginalsbyid/:id").get(getOriginalById)
module.exports = router