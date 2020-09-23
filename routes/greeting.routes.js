/*
 *Purpose  : The routes calls and methods
 *@files   : greeting.route.js
 *@overview: route contents
 *@author  : Himanshu Gharat
 *@verson  : 1.0
 *@since   : 19-09-2020
 */
module.exports = (app) => {
  const greeting = require("../controllers/greeting.controller");

  //greeting message
  app.get("/a", greeting.simpleMessage);

  //name greeting message
  app.get("/greetByName/:fname?/:lname?", greeting.nameGreeting);

  //create new message
  app.post("/greeting", greeting.create);

  //find all messages
  app.get("/greeting", greeting.findAll);

  //find messages by id
  app.get("/greeting/:id", greeting.findById);

  //edit messages by id
  app.put("/greeting/:id", greeting.editById);

  //delete messages by id
  app.delete("/greeting/:id", greeting.deleteById);
};
