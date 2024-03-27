const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
    host: 'localhost', // Change this to your MySQL server address
    user: 'root', // Change this to your MySQL username
    password: '', // Change this to your MySQL password
    database: 'rrbeatlemeco_db' // Change this to your MySQL database name
});
const cors=require("cors");
const videoRoutes=require('./Routes/videoRoutes.js');
const audioBookRoutes=require("./Routes/audioBookRoutes.js")
const categoryRoutes=require("./Routes/categoryRoutes.js");
const ebookRoutes=require("./Routes/eBookRoutes.js");
const shopRoutes=require("./Routes/shopRoutes.js");
const podcastRoutes=require("./Routes/podcastRoutes.js");
const shikshaRoutes=require("./Routes/shikshaRoutes.js");
const circleRoutes=require("./Routes/circleRoutes.js");
const communityRoutes=require("./Routes/communityRoutes.js");
const karyashalaRoutes=require("./Routes/karyashalaRoutes.js");
const pathshalaRoutes=require("./Routes/pathshalaRoutes.js");
const eventsRoutes=require("./Routes/eventsRoutes.js");
const creatorRoutes=require("./Routes/creatorRoutes.js");
const otherRoutes=require("./Routes/otherRoutes.js");
const port = process.env.PORT || 8082;
app.use(express.json());
app.use(cors());
app.use("/videos",videoRoutes);
app.use("/audiobooks",audioBookRoutes);
app.use("/category",categoryRoutes);
app.use("/ebooks",ebookRoutes);
app.use("/shop",shopRoutes);
app.use("/podcasts",podcastRoutes);
app.use("/shiksha",shikshaRoutes);
app.use("/circles",circleRoutes);
app.use("/communities",communityRoutes);
app.use("/karyashala",karyashalaRoutes);
app.use("/pathshala",pathshalaRoutes);
app.use("/events",eventsRoutes);
app.use("/creator",creatorRoutes);
app.use("/others",otherRoutes);
app.listen(port, () => {
    console.log(`listening on port:${port}`);
})