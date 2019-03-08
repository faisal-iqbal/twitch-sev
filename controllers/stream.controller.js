'use strict';

module.exports = {

    // If user has an authenticated session, display it, otherwise display link to authenticate
    index: (req, res) => {
        if (req.session
            && req.session.passport
            && req.session.passport.user
            && req.query.streamer_name) {

            req.session.streamer_name = req.query.streamer_name;
            var data = req.session.passport.user;
            data["streamer_name"] = req.session.streamer_name;
            res.render('stream', data);
        } else {
            res.redirect(`/`);
        }
    }
}