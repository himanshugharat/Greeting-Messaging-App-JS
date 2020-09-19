exports.loadData = (callback) => {
  const fs = require("fs");
  const path = "./db/data.json";
  let input = fs.readFileSync(path);
  let data = JSON.parse(input);
  return callback(data);
};

exports.Greet = (callback) => {
  return callback("hello");
};
