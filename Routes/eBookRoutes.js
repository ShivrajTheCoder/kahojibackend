const express = require('express')
const { getAllEbooks, getEbookById } = require('../Controllers/EbookController')

const router = express.Router()

router.route("/getallebooks").get(getAllEbooks)
router.route("/getebookbyid/:id").get(getEbookById)
module.exports = router