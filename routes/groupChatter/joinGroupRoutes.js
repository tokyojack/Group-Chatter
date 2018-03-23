var router = require("express").Router();

var middleMan = require("../../utils/middleMan");
var flashUtils = require('../../utils/flashUtils');

var redirectLocation = "/home";

// URL: "/home"
module.exports = function(pool) {

    // "home.ejs" page
    router.get("/", middleMan.isLoggedIn, function(req, res) {
        res.render("groupChatter/joinGroup.ejs");
    });

    // "compose.ejs" page post
    router.post("/", middleMan.isLoggedIn, function(req, res) {
        pool.getConnection(function(err, connection) {
            if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                return;

            var joinGroup = require('./queries/joinGroup.sql');

            connection.query(joinGroup, [req.user.id, req.body.title], function(err, row) {
                connection.release();

                if (flashUtils.isDatabaseError(req, res, redirectLocation, err))
                    return;

                flashUtils.successMessage(req, res, '/group/'+row.insertId, 'Successfully joined the group!');
            });
        });

    });

    return router;
};
