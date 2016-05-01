var originSiteReader = require('../util/OriginSiteReader');
var express = require('express');

var router = express.Router();

/* Try login with auth token */
router.get('/autologin', function (req, res, next) {
    var token = req.query.auth_token;

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

module.exports = router;
