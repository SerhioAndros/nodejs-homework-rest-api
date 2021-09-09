const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscription = require("./updateSubscription");
const updateVerification = require("./updateVerification");
const resendVerification = require("./resendVerification");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  updateVerification,
  resendVerification,
};
