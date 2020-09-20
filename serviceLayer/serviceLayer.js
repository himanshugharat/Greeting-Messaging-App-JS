/*
 *Purpose  : The services for greetings app
 *@files   : serviceLayer.js
 *@overview: loading data
 *@author  : Himanshu Gharat
 *@verson  : 1.0
 *@since   : 19-09-2020
 */

/**
 * @description: to load the json file data
 * @param {*} callback
 */
exports.loadData = (callback) => {
  const fs = require("fs");
  const path = "./db/data.json";
  let input = fs.readFileSync(path);
  let data = JSON.parse(input);
  return callback(data);
};

/**
 * @description:simple hello test message
 * @param {*} callback
 */
exports.Greet = (callback) => {
  return callback("hello");
};
