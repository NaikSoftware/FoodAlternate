var express = require('express');
var router = express.Router();

/* Try login with verificationToken*/
router.get('/autologin', function(req, res, next) {
  var token = req.params.verification_token;
  res.send({
      status: 'ERROR',
      message: 'Not implemented server query'
  });
});

module.exports = router;
