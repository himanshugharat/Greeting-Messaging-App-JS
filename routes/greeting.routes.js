module.exports = (app) => {
  const greeting = require("../controllers/greeting.controller");

  //find all messages
  app.get("/greeting", greeting.findAll);

  //greeting message
  app.get("/greet", greeting.simpleMessage);

  //name greeting message
  app.get("/greetByName/:fname?/:lname?", greeting.nameGreeting);
};
