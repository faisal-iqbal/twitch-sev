'use strict';

const io       = require('socket.io-client');
const webhooks = require('../models/webhooks');
const socket   = io(process.env.BASE_URL);

module.exports = {

    index: (req, res) => {
        res.send('ok');
    },

    subscribe: (req, res) => {
        webhooks.subscribe(req.params.streamer_name);
        res.send('ok');
    },

    verify: (req, res) => {
        console.log('webhook verify query ', req.query);

        if(req.query && req.query['hub.challenge']){
            socket.emit('webhook', 'challenge received');
            res.send(req.query['hub.challenge']);
        } else {
            socket.emit('webhook', 'not a challenge');
            res.send('ok');
        }
    },

    notify: (req, res) => {
        const body = JSON.parse(req.body);

        if (body['data']) {
            for (let i =0; i < body['data'].length;i++){
                //msg = `${body['data'][i]['from_name']} has started following ${body['data'][i]['to_name']}`;
                socket.emit('webhook', body['data'][i]);
            }
        }

        res.send('ok');
    }
}