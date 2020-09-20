/*
 *Purpose  : The controllers for the routes
 *@files   : greeting.controller.js
 *@overview: route contents
 *@author  : Himanshu Gharat
 *@verson  : 1.0
 *@since   : 19-09-2020
 */
const { response } = require("express");
const fs = require("fs");
const { request } = require("http");
const path = "./db/data.json";
const service = require("../serviceLayer/serviceLayer");

/**
 * @description: simple get helloworld message
 * @param {*} request
 * @param {*} response
 */
exports.simpleMessage = (request, response) => {
  service.Greet((message) => {
    response.send(message);
  });
};

/**
 * @description: the helloWorld greeting with name
 * @param {*} request
 * @param {*} response
 */
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

/**
 * @description: create a new entry in json file
 * @param {*} request
 * @param {*} response
 */
exports.create = (request, response) => {
  service.loadData((data) => {
    var message = {
      id: data.length + 1,
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

/**
 * @description: get all the data from json
 * @param {*} request
 * @param {*} response
 */
exports.findAll = (request, response) => {
  service.loadData((data) => {
    response.send(data);
  });
};

/**
 * @description: find a entry in json file by id
 * @param {*} request
 * @param {*} response
 */
exports.findById = (request, response) => {
  var reply;
  let ids = request.params.id;
  service.loadData((data) => {
    for (let i = 0; i < data.length; i++) {
      data[i].id == ids
        ? (reply = { msg: data[i] })
        : (reply = { msg: "not found" });
    }
  });
  response.send(reply);
};

/**
 * @description: edit a entry in json file by id
 * @param {*} request
 * @param {*} response
 */
exports.editById = (request, response) => {
  var reply;
  let ids = request.params.id;
  service.loadData((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == ids) {
        data[i].first_name = request.body.first_name;
        data[i].last_name = request.body.last_name;
        reply = { msg: data[i] };
        fs.writeFile(path, JSON.stringify(data, null), "utf8", (err) => {
          console.log("all set");
        });
      } else {
        reply = { msg: "not found" };
      }
    }
  });
  response.send(reply);
};

/**
 * @description: delete a entry in json file using id
 * @param {*} request
 * @param {*} response
 */
exports.deleteById = (request, response) => {
  var reply;
  let ids = request.params.id;
  service.loadData((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == ids) {
        data.splice(i, i);
        fs.writeFile(path, JSON.stringify(data, null), "utf8", (err) => {
          console.log("deleted");
        });
        reply = { msg: "deleted succesfully" };
      } else {
        reply = { msg: "not found" };
      }
    }
  });
  response.send(reply);
};
