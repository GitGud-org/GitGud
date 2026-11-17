const { git } = require("./actions/git");

module.exports = () => git(["branch", "--show-current"]).trim();
