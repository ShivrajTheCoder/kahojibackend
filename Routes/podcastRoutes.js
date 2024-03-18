const express=require('express')
const { getPodcasts, getPodcastsById } = require('../Controllers/PodcastController')

const router=express.Router()

router.route("/getallpodcasts").get( getPodcasts)
router.route("/getpodcastbyid/:id").get(getPodcastsById)
module.exports=router