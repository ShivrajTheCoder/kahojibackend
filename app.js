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
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to database.');

//   // Query to get all tables
//   const query = "SELECT * FROM videos";
//   connection.query(query, [connection.config.database], (error, results, fields) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       return;
//     }
//     console.log('List of tables:');
//     results.forEach((row) => {
//       console.log(row.table_name);
//     });

//     // Don't forget to close the connection when you're done
//     connection.end();
//   });
// });
const videoRoutes=require('./Routes/videoRoutes.js')
const port = process.env.PORT || 8082;
app.use(express.json());
app.use("/videos",videoRoutes);
app.listen(port, () => {
    console.log(`listening on port:${port}`);
})