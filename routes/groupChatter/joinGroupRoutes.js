var router = require("express").Router();

var middleMan = require("../../utils/middleMan");
var flashUtils = require("../../utils/flashUtils");

var redirectLocation = "/home";

// URL: "/joingroup"
module.exports = function (pool) {

    // "joinGroup.ejs" page
    router.get("/", middleMan.isLoggedIn, (req, res) => res.render("groupChatter/joinGroup.ejs"));

    // Add's the user to the group
    router.post("/", middleMan.isLoggedIn, function (req, res) {
        pool.getConnection(function (err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var joinGroup = require("./queries/joinGroup.sql");

            connection.query(joinGroup, [req.user.id, req.body.title], function (
                err,
                row
            ) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                // Redirect's the user to the joined group
                flashUtils.successMessage(
                    req,
                    res,
                    "/group/" + row.insertId,
                    "Successfully joined the group!"
                );
            });
        });
    });

    return router;
};