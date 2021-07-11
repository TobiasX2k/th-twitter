var express = require('express');
const app = express();
var router = express.Router();
const { apiAuthMiddleware: requireApiKey } = require('./auth');

router.get('/testEndpoint', requireApiKey,(req,res) => {
  res.send("hello");
});

router.get('/tweets/:username', requireApiKey,(req,res) => {
    console.log('in tweets');
    var Twitter = require('twitter');
    console.log('twitter created');
    var client = new Twitter({
      consumer_key: process.env.twitter_api_consumer_key,
      consumer_secret: process.env.twitter_api_consumer_secret_key,
      access_token_key: process.env.twitter_api_access_token,
      access_token_secret: process.env.twitter_api_access_token_secret
    });
    console.log('client created');
    var username = req.params.username.toLowerCase();
    console.log('username: '+username)
    var params = {screen_name: username};
    console.log('making call');
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        console.log('call succeeded ');
      if (!error) {
        console.log('tweets '+tweets);
        res.send({
            tweets: tweets,
            username: username
        });
      }else{
        console.log('error '+error);
        res.send({
            error: error
        });
      }
    });
    console.log('after call');  
});

router.get('/twitter_friends_list/:screenname', requireApiKey,(req,res) =>{
    console.log('in twitter_friends_list');
    var Twitter = require('twitter');
    console.log('twitter created');
    var client = new Twitter({
      consumer_key: process.env.twitter_api_consumer_key,
      consumer_secret: process.env.twitter_api_consumer_secret_key,
      access_token_key: process.env.twitter_api_access_token,
      access_token_secret: process.env.twitter_api_access_token_secret
    });
    console.log('client created');
    var screenname = req.params.screenname.toLowerCase();
    console.log('screenname: '+screenname)
    //var params = {screen_name: 'nodejs'};
    var params = {screen_name: screenname};
    console.log('making call');
    client.get('friends/list', params, function(error, friendlist, response) {
        console.log('call succeeded ');
      if (!error) {
        console.log('friendlist '+friendlist);
        res.send({
            friendlist: friendlist,
            screenname: screenname
        });
      }else{
        console.log('error '+error);
        res.send({
            error: error
        });
      }
    });
    console.log('after call');  
});

router.get('/bannerImageUrl/:screenname', requireApiKey,(req,res) => {
    console.log('in bannerImageUrl');
    var Twitter = require('twitter');
    console.log('twitter created');
    var client = new Twitter({
      consumer_key: process.env.twitter_api_consumer_key,
      consumer_secret: process.env.twitter_api_consumer_secret_key,
      access_token_key: process.env.twitter_api_access_token,
      access_token_secret: process.env.twitter_api_access_token_secret
    });
    console.log('client created');
    var screenname = req.params.screenname.toLowerCase();
    console.log('screenname: '+screenname)
    var params = {screen_name: screenname};
    console.log('making call');
    client.get('users/profile_banner', params, function(error, userData, response) {
        console.log('call succeeded ');
      if (!error) {
        console.log('userData '+userData);
        res.send({
            bannerImageUrl: userData,
            screenname: screenname
        });
      }else{
        console.log('error '+error);
        res.send({
            error: error
        });
      }
    });
    console.log('after call');  
});

router.get('/bannerImageUrl/:screenname', requireApiKey,(req,res) => {
    console.log('in bannerImageUrl');
    var Twitter = require('twitter');
    console.log('twitter created');
    var client = new Twitter({
      consumer_key: process.env.twitter_api_consumer_key,
      consumer_secret: process.env.twitter_api_consumer_secret_key,
      access_token_key: process.env.twitter_api_access_token,
      access_token_secret: process.env.twitter_api_access_token_secret
    });
    console.log('client created');
    var screenname = req.params.screenname.toLowerCase();
    console.log('screenname: '+screenname)
    //var params = {screen_name: 'nodejs'};
    var params = {screen_name: screenname};
    console.log('making call');
    client.get('users/show', params, function(error, userData, response) {
        console.log('call succeeded ');
      if (!error) {
        console.log('userData '+userData);
        res.send({
            bannerImageUrl: userData,
            screenname: screenname
        });
      }else{
        console.log('error '+error);
        res.send({
            error: error
        });
      }
    });
    console.log('after call');  
});

app.use('/', router);

module.exports = app;