const applicationController = require('./controllers/application.controller');
const passport = require('./libs/twitchpassport');
const express = require('express');
const router = express.Router();

// Set route to start OAuth link, this is where you define scopes to request
router.route('/auth/twitch').get(passport.authenticate('twitch', {
    scope: 'user_read'
}));
// Set route for OAuth redirect
router.route('/auth/twitch/callback').get(passport.authenticate('twitch', {
    successRedirect: '/',
    failureRedirect: '/error'
}));

router.route('/').get(applicationController.index);
router.route('/error').get(applicationController.error);

module.exports = router;