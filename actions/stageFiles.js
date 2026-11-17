const { git } = require("./git");

module.exports = () => git(["add", "."]);
