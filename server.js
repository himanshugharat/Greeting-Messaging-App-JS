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
//creste app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//define a simple route
app.get("/", (request, response) => {
  response.json({ message: "welcome to messaging app" });
});

//Require notes routes
require("./routes/greeting.routes")(app);

//listen for request
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
