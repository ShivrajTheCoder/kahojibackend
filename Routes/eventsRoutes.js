const express = require('express');
const { getAllEvents, getEventsById, addEvent } = require('../Controllers/EventsController');

const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/events') // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
        // Use original file name with a timestamp to avoid overwriting files with the same name
        cb(null, Date.now() + '-' + file.originalname)
    }
});
// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage })
const multipleUpload=upload.fields([{name:"event",maxCount:1}])
router.route("/getallevents").get(getAllEvents);
router.route("/geteventbyid/:id").get(getEventsById);
router.route('/addevent')
    .post(multipleUpload,addEvent);
module.exports = router;
