$(function () {
    loadTwitchEmbed();
    subscribeToEvents();
    loadWebSocket();
});

var loadTwitchEmbed = () => {
    new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: window.streamer_name
    });
};

var subscribeToEvents = () => {
    $.ajax({
        url: "/webhook/subscribe/" + window.streamer_name
    }).done(function() {
        console.log( "subscribed to streamers events" );
    });
};

var loadWebSocket = () => {
    var socket = io();
    socket.on('webhook', function(msg){
        console.log('ws got message', msg);
        if((msg.to_name && msg.to_name.toLowerCase() == window.streamer_name)
        ||(msg.from_name && msg.from_name.toLowerCase() == window.streamer_name)) {
            var text = msg.from_name + ' has start following ' + msg.to_name;
            $('ul#events').append($('<li>').text(text).addClass('list-group-item'));
        }
    });
};