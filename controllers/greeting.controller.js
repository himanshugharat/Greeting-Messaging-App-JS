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
const path = "./config/data.json";
const service = require("../serviceLayer/serviceLayer");
const Joi = require("joi");

/**
 * @description: simple get helloworld message
 * @param {*} request
 * @param {*} response
 */
exports.simpleMessage = (request, response) => {
  try {
    service.Greet((message) => {
      response.send(message);
      document.getElementById("card-data").innerHTML(message)
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
};

/**
 * @description: the helloWorld greeting with name
 * @param {*} request
 * @param {*} response
 */
exports.nameGreeting = (request, response) => {
  try {
    let firstName = request.params.fname;
    let lastName = request.params.lname;
    if (!firstName) {
      lastName = "";
    }
    if (!lastName) {
      firstName = "";
    }
    reply = firstName + " " + lastName + "helloWorld ";
    response.status(200).send(reply);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

/**
 * @description: create a new entry in json file
 * @param {*} request
 * @param {*} response
 */
exports.create = (request, response) => {
  const { error } = validatorInput(request.body);
  if (error) {
    return response.status(500).send(error.details[0].message);
  } else {
    try {
      service.loadData((data) => {
        var message = {
          id: data.length + 1,
          firstName: request.body.first_name,
          lastName: request.body.last_name,
        };
        data.push(message);
        fs.writeFile(path, JSON.stringify(data, null), "utf8", (err) => {
          console.log("all set");
        });
        var reply = {
          msg: "the data is added",
        };
        response.status(200).send(reply);
      });
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
};
/**
 * @description: get all the data from json
 * @param {*} request
 * @param {*} response
 */
exports.findAll = (request, response) => {
  try {
    service.loadData((data) => {
      response.status(200).send(data);
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
};

/**
 * @description: find a entry in json file by id
 * @param {*} request
 * @param {*} response
 */
exports.findById = (request, response) => {
  try {
    var reply;
    let ids = request.params.id;
    service.loadData((data) => {
      for (let i = 0; i < data.length; i++) {
        data[i].id == ids
          ? (reply = { msg: data[i] })
          : (reply = { msg: "not found" });
      }
    });
    response.status(200).send(reply);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

/**
 * @description: edit a entry in json file by id
 * @param {*} request
 * @param {*} response
 */
exports.editById = (request, response) => {
  const { error } = validatorInput(request.body);
  if (error) {
    return response.status(500).send(error.details[0].message);
  } else {
    try {
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
      response.status(200).send(reply);
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
};
/**
 * @description: delete a entry in json file using id
 * @param {*} request
 * @param {*} response
 */
exports.deleteById = (request, response) => {
  try {
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
    response.status(200).send(reply);
  } catch (error) {
    response.status(500).send(error.message);
  }
};
validatorInput = (message) => {
  const valid = Joi.object({
    first_name: Joi.string().min(3),
    last_name: Joi.string().min(3),
  });
  return valid.validate(message);
};
