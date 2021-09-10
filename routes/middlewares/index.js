const validation = require("./validateContacts");
const authenticate = require("./authUser");
const imgUpload = require("./imgTmpSave");

module.exports = {
  validation,
  authenticate,
  imgUpload,
};
