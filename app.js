const express = require("express");
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
    host: 'localhost', // Change this to your MySQL server address
    user: 'root', // Change this to your MySQL username
    password: '', // Change this to your MySQL password
    database: 'rrbeatlemeco_db' // Change this to your MySQL database name
});
const baseUploadsPath = path.join(__dirname, 'uploads');
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
const channelRoutes=require("./Routes/channelRoutes.js");
const interestRoutes=require("./Routes/interestRoutes.js");
const liveRoutes=require("./Routes/liveRoutes.js");
const port = process.env.PORT || 8082;
app.use(express.json());
app.use(cors());

// image folders
app.use('/images/shop', express.static(path.join(baseUploadsPath, 'shop')));
app.use('/images/podcasts', express.static(path.join(baseUploadsPath, 'podcasts')));
app.use('/images/ebooks', express.static(path.join(baseUploadsPath, 'ebooks')));
app.use('/images/audiobooks', express.static(path.join(baseUploadsPath, 'audiobooks')));
app.use('/images/ebooks', express.static(path.join(baseUploadsPath, 'ebooks')));
app.use('/images/events', express.static(path.join(baseUploadsPath, 'events')));

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
app.use("/channels",channelRoutes);
app.use("/interests",interestRoutes);
app.use("/lives",liveRoutes);
app.listen(port, () => {
    console.log(`listening on port:${port}`);
})