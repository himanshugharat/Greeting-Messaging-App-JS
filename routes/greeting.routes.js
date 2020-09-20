module.exports = (app) => {
  const greeting = require("../controllers/greeting.controller");

  //greeting message
  app.get("/greet", greeting.simpleMessage);

  //name greeting message
  app.get("/greetByName/:fname?/:lname?", greeting.nameGreeting);

  //create new message
  app.post("/greeting", greeting.create);

  //find all messages
  app.get("/greeting", greeting.findAll);

   //find messages by id
   app.get("/greetById/:id", greeting.findById);
};
