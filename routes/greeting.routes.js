module.exports = (app) => {
  const greeting = require("../controllers/greeting.controller");

  //find all messages
  app.get("/greeting", greeting.findAll);

//   //create a new message
//   app.post("/greeting", greeting.create);

//   //get single greeting message
//   app.get("/greeting/:firstName", greeting.findOne);

//   //update a name
//   app.put("/greetings/:firstName", greeting.update);

//   //delete entry
//   app.delete("/greeting/:firstName", greeting.delete);
};
