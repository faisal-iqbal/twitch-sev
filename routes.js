const applicationController = require('./controllers/application.controller');
const streamController      = require('./controllers/stream.controller');
const webhooksController    = require('./controllers/webhooks.controller');
const passport              = require('./libs/twitchpassport');
const express               = require('express');
const router                = express.Router();

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
router.route('/logout').get(applicationController.logout);
router.route('/error').get(applicationController.error);

router.route('/stream').get(streamController.index);

router.route('/webhook/subscribe/:streamer_name').get(webhooksController.subscribe);
router.route('/webhook/callback').get(webhooksController.verify);
router.route('/webhook/callback').post(webhooksController.notify);

module.exports = router;