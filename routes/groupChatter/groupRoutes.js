var router = require("express").Router();
var middleMan = require("../../utils/middleMan");

// URL: "/group"
module.exports = function () {

    // "group.ejs" page
    router.get("/:id", middleMan.isLoggedIn, (req, res) => res.render("groupChatter/group.ejs", {
        id: parseInt(req.params.id)
    }));

    return router;
};