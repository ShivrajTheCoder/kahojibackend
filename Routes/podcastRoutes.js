const express=require('express')
const { getPodcasts, getPodcastsById, getPodcastsByCategoryId, addPodcast } = require('../Controllers/PodcastController')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/podcasts') // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
        // Use original file name with a timestamp to avoid overwriting files with the same name
        cb(null, Date.now() + '-' + file.originalname)
    }
});
// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage })
const multipleUpload=upload.fields([{name:"thumbnail",maxCount:1},{name:"mediaFile",maxCount:1}])
const router=express.Router()

router.route("/getallpodcasts").get( getPodcasts)
router.route("/getpodcastbyid/:id").get(getPodcastsById)
router.route("/getpodcastsbycategory/:category_id").get(getPodcastsByCategoryId)
router.route("/uploadpodcast").post(multipleUpload,addPodcast)
module.exports=router