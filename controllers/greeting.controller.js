const { response } = require("express");
const fs = require("fs");
const { request } = require("http");
const path = "./db/data.json";
const service = require("../serviceLayer/serviceLayer");

exports.simpleMessage = (request, response) => {
  service.Greet((message) => {
    response.send(message);
  });
};

exports.findAll = (request, response) => {
  service.loadData((data) => {
    response.send(data);
  });
};

exports.nameGreeting = (request, response) => {
  let fname = request.params.fname;
  let lname = request.params.lname;
  if (!lname) {
    lname = "";
  }
  if (!fname) {
    fname = "";
  }
  reply = fname + " " + lname + "helloWorld ";
  response.send(reply);
};

exports.create = (request, response) => {
  service.loadData((data) => {
    var message = {
      id: data.length,
      first_name: request.body.first_name,
      last_name: request.body.last_name,
    };
    data.push(message);
    fs.writeFile(path, JSON.stringify(data, null), "utf8", (err) => {
      console.log("all set");
    });
    var reply = {
      msg: "the data is added",
    };
    response.send(reply);
  });
};
