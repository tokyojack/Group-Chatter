var router = require("express").Router();

var middleMan = require("../../utils/middleMan");
var flashUtils = require("../../utils/flashUtils");

var redirectLocation = "/home";

// URL: "/home"
module.exports = function (pool) {
    // "home.ejs" page
    router.get("/", middleMan.isLoggedIn, function (req, res) {
        res.render("groupChatter/createGroup.ejs");
    });

    // "compose.ejs" page post
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