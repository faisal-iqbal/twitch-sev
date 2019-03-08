'use strict';

const env     = require('dotenv').config();
const request = require('request');

class Webhooks {
    static subscribe(streamer_name) {
        this.getStreamerId(streamer_name, (streamer_id) => {
            const desired_topics = [
                "https://api.twitch.tv/helix/users/follows?first=1&to_id=" + streamer_id,
                "https://api.twitch.tv/helix/users/follows?first=1&from_id=" + streamer_id
            ];

            for (var i = 0; i < desired_topics.length; i++) {
                this.subscribeToTopic(desired_topics[i]);
            }
        });
    }

    static getStreamerId(streamer_name, callback) {
        try {
            var options = {
                method: 'GET',
                url: 'https://api.twitch.tv/helix/users',
                qs: {
                    login: streamer_name
                },
                headers: {
                    'Client-Id': '2q123s1lmn8x3addlrpp0piy4f614v'
                }
            };

            request(options, function (err, res, body) {
                if (err) {
                    console.error('error getting user id for ' + streamer_name, err);
                    throw err;
                }
                console.log('got user info: ', body);
                const parsed = JSON.parse(body);
                if (parsed["data"] && parsed["data"][0]) {
                    callback(parsed["data"][0]["id"]);
                    return;
                }
            });
        } catch (e) {
            console.error('exception in getting streamer id', e);
        }
    }

    static subscribeToTopic(topic) {
        try {
            var options = {
                headers: {
                    'Client-Id': process.env.TWITCH_CLIENT_ID
                },
                method: 'post',
                json: true,
                body: {
                    "hub.mode": "subscribe",
                    "hub.topic": topic,
                    "hub.callback": process.env.BASE_URL + "webhook/callback",
                    "hub.lease_seconds": "864000",
                    "hub.secret": "s3cRe7"
                },
                url: 'https://api.twitch.tv/helix/webhooks/hub',
            };

            request(options, function (err, res, body) {
                if (err) {
                    console.error('error subscribing to  ' + topic, err);
                    throw err;
                }
                console.log('subscribed to ' + topic, body);
            });
        } catch (e) {
            console.error('exception in subscribing topic', e);
        }
    }
}

module.exports = Webhooks;