var router = require("express").Router();
var middleMan = require("../../utils/middleMan");

// URL: "/home"
module.exports = function() {

    // "home.ejs" page
    router.get("/:id", middleMan.isLoggedIn, function(req, res) {
        res.render("groupChatter/group.ejs",{
            id: parseInt(req.params.id) 
        });
    });

    return router;
};
