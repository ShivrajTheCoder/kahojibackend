const express=require('express')
const { getVideos, getVideosById } = require('../Controllers/VideoController')
const router=express.Router()

router.route("/getallvideos").get(getVideos)
router.route("/getvideosbyid/:id").get(getVideosById)
module.exports=router