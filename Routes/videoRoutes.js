const express=require('express')
const router=express.Router()

router.route("/getallvideos").get(get)
router.route("/getvideosbyid/:id").get(getVideosById)
module.exports=router