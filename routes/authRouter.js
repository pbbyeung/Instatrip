var express = require('express');
var instagram = require('../APIs/insta');
var authRouter = express.Router();
var config = require('../config.js');
var request = require('superagent');

authRouter.get('/instagram', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://vizitrip.herokuapp.com');
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.redirect('https://api.instagram.com/oauth/authorize/?client_id='+ config.InstaClientID +'&redirect_uri='+ config.callback_url +'&response_type=code');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

authRouter.get('/instagram/callback', function(req, res) {
  var code = req.query.code;
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'http://vizitrip.herokuapp.com');

  request.post('https://api.instagram.com/oauth/access_token')
  .withCredentials()
  .send('client_id=' + config.InstaClientID)
  .send('client_secret=' + config.InstaClientSecret)
  .send('grant_type=' + 'authorization_code')
  .send('redirect_uri=' + config.callback_url)
  .send('code=' + code)
  .end(function(err, instaReq) {
    var access_token = instaReq.body.access_token;
    instagram.getMyInstaData(access_token, function(profile) {
      res.send(JSON.stringify(profile));
    });
  });

});

authRouter.get('/logout', function(req, res) {
  res.redirect('https://instagram.com/accounts/logout/');
});
var app = express();

module.exports = authRouter;
