const express=require("express");
const { adminLogin } = require("../Controllers/AuthController");
const router=express.Router();


router.route("/adminlogin")
    .post(adminLogin);


module.exports=router;