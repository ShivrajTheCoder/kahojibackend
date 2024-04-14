const express = require('express');
const { getAllCategories, getCategoryById, getAllOriginals, getOriginalById, addCategory, addOriginalCategory } = require('../Controllers/CategoryController');

const router = express.Router();

// Get all categories
router.route("/getallcategories").get(getAllCategories);

// Get all originals
router.route("/getalloriginals").get(getAllOriginals);

// Get category by ID
router.route("/getcategorybyid/:id").get(getCategoryById);

// Get original by ID
router.route("/getoriginalbyid/:id").get(getOriginalById);

// Add a new category
router.route("/addcategory").post(addCategory);

// Add a new original category
router.route("/addoriginalcategory").post(addOriginalCategory);

module.exports = router;
