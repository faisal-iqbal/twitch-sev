'use strict';

module.exports = {

    // If user has an authenticated session, display it, otherwise display link to authenticate
    index: (req, res) => {
        if (req.session && req.session.streamer_name) {
            res.redirect(`/stream`);
        } else {
            res.render('home', {loggedin: (req.session && req.session.passport && req.session.passport.user)});
        }
    },

    error: (req, res) => {
        res.render('error');
    }
}