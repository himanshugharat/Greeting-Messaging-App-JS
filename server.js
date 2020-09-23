/*
 *@Execution: cmd>node server.js or cmd>nodemon server.js
 *Purpose  : The starting the local host
 *@files   : server.js
 *@overview: establish the localhost server
 *@author  : Himanshu Gharat
 *@verson  : 1.0
 *@since   : 19-09-2020
 */
const bodyParser = require("body-parser");
const express = require("express");
var path = require("path");
//create app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//define a simple route
app.get("/", (request, response) => {
  response.json({ message: "welcome to messaging app" });
});

//get our css file on server
app.use("/cssFiles", express.static(__dirname + "/css"));

//get our image folder on server
app.use("/images", express.static(__dirname + "/images"));

//display our index file on server
app.get("/a", (request, response) => {
  response.sendFile("index.html", { root: path.join(__dirname) });
});

//Require notes routes
require("./routes/greeting.routes")(app);

//listen for request
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
