const { response } = require("express");
const fs = require("fs");
const { request } = require("http");
const path = "./config/data.json";
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
