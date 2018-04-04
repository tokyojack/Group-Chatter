var router = require("express").Router();
var middleMan = require("../../utils/middleMan");

// URL: "/home"
module.exports = function() {
  // "home.ejs" page
  router.get("/", middleMan.isLoggedIn, (req, res) =>
    res.render("groupChatter/home.ejs")
  );

  return router;
};
