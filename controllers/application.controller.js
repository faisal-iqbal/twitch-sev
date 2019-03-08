'use strict';

module.exports = {

    // If user has an authenticated session, display it, otherwise display link to authenticate
    index: (req, res) => {
        var data = {loggedin: false};
        if (req.session && req.session.passport && req.session.passport.user) {
            data = req.session.passport.user
            data['loggedin'] = true;
        }
        res.render('home', data);
    },

    error: (req, res) => {
        res.render('error');
    }
}