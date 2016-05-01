var originSiteReader = require('../util/OriginSiteReader');
var express = require('express');

var router = express.Router();

/* Try login with auth token */
router.post('/autologin', function (req, res, next) {
    var token = req.cookies.auth_token;

    originSiteReader.readFoodTable(token).then(function (table) {
        res.send({
            status: 'OK',
            data: table
        });
    }).catch(function (err) {
        res.send({
            status: 'ERROR',
            message: err
        });
    });
});

/* Login on origin site and return auth token */
router.post('/login', function (req, res, next) {
    originSiteReader.login(req.body.username, req.body.password).then(function (data) {
        res.cookie('auth_token', data.authToken);
        res.send({
            status: 'OK',
            data: data.table
        });
    }).catch(function (err) {
        res.send({
            status: 'ERROR',
            message: err
        });
    });
});

module.exports = router;
