/*const fs = require("fs");
var inputs = fs.readFileSync("data.json",(err,data)=>{
  var user = JSON.parse(data);
  return user;
});
module.exports = inputs;
*/

module.exports = {
  info: () => {
    const fs = require("fs");
    var inputs = fs.readFileSync("./config/data.json", (err, data) => {
      var user = JSON.parse(data);
      return user;
    });
  },
};
