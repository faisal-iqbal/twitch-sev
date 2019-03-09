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

    logout: (req, res) => {
        req.session.destroy()
        res.redirect(`/stream`);
    },

    error: (req, res) => {
        res.render('error');
    }
}