var router = require("express").Router();

var middleMan = require("../../utils/middleMan");
var flashUtils = require("../../utils/flashUtils");

var redirectLocation = "/home";

// URL: "/creategroup"
module.exports = function (pool) {

    // "createGroup.ejs" page
    router.get("/", middleMan.isLoggedIn, (req, res) => res.render("groupChatter/createGroup.ejs"));

    // Create's the group when submitted
    router.post("/", middleMan.isLoggedIn, function (req, res) {
        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var createGroup = require("./queries/createGroup.sql");

            connection.query(
                createGroup, [req.body.title, req.user.id, req.user.id],
                function (err, row) {
                    connection.release();

                    if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                        return;

                    // Redirect's the user to the new created group
                    flashUtils.successMessage(
                        req,
                        res,
                        "/group/" + row[0].insertId,
                        "Successfully created the group!"
                    );
                }
            );
        });
    });

    return router;
};