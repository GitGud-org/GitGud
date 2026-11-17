const { git } = require("./git");

module.exports = () => git(["status", "-s"]);
