# Twitch StreamerEventViewer (SEV)

## Installation
1) Setup environemnt:
**For Local :** Create a copy of `.enc.example` file and rename it `.env` **For Heroku:** Setup Config vars on Heroku according to variables defined in `.env.example` file

2) Install dependencies using following command:
```sh
$ npm install
```

## Usage
Run using following command:
```sh
$ node index.js
```

# Questions

## How would you deploy the above on AWS? (ideally a rough architecture diagram will help)

We can utilize AWS fargate to deploy this app. in this case, deployment will start pushing code to GitHub which will trigger jenkins build, using ECS plugin for Jenkins code will be deployed on AWS Fargate.
A simple diagram (`deployment.png`) is available in current directory.

## Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?

We could leavrage cacheing to reduce requests to server. Right now, streamer page is using session and query string to load video, chat and events of streamer. We can change it to use permalinks and localstorage(I have already built streamer page to subscribe to webhooks after page load, which means it could work even if it loads from cache)

We can also move socket.io(webhooks) part out of this application, into a standalone application. (webhooks handling is done in separate Controller and Model and can easily move out of this application.) This will allow us to scale both applications based on load on each application.

To scale socket.io application, we can create a shared redis which will be used by socket.io servers. We can then horizontally scale socket.io application.