const fs = require("fs");
const path="./config/greetingData.json"
exports.findAll = (request, response) => {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    response.send(data);
  });
};
