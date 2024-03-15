const express = require('express')
const { getAudioBooks, getAudioBooksById } = require('../Controllers/AudioBookController')
const router = express.Router()

router.route("/getallaudiobooks").get(getAudioBooks)
router.route("/getaudiobooksbyid/:id").get(getAudioBooksById)
module.exports = router