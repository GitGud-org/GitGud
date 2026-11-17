const { git } = require("./git");

module.exports = () => git(["reset"]);
