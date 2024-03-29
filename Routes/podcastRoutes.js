const express=require('express')
const { getPodcasts, getPodcastsById, getPodcastsByCategoryId } = require('../Controllers/PodcastController')

const router=express.Router()

router.route("/getallpodcasts").get( getPodcasts)
router.route("/getpodcastbyid/:id").get(getPodcastsById)
router.route("/getpodcastsbycategory/:category_id").get(getPodcastsByCategoryId)
module.exports=router