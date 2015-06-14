var irc = require("irc"),
    helpers = require("./helpers.js"),
    c = require("irc-colors"),
    env = require("node-env-file");

// ENV File stuff
env(__dirname + '/.env');

// Configuration
var config = {
    channels: process.env.channels.split(' '),
    server: process.env.server,
    botName: process.env.nick
};

// Add the helpers
helpers.init();

var bot = new irc.Client(config.server,config.botName, {
    channels: config.channels,
    floodProtection: true,
    floodProtectionDelay: 1000,
    autoRejoin: true
});

// Every 3 hours display the countdown to the channel
bot.addListener("registered", function (message) {
    setInterval(function () {
        bot.say("#fallout",helpers.getCount());
    }, 1800000)
});

// Watch for commands
bot.addListener("message#", function(from,to,text,message) {
    switch (text.getFirst()) {
        case '!hello' :
            bot.say(to, c.rainbow( "Hello {0}".format(from),null));
            break;
        case '!timer' :
            bot.say(to, helpers.getCount());
            break;
        case '!link' :
            bot.say(to, 'Twitch: http://www.twitch.tv/bethesda || Youtube: https://www.youtube.com/user/BethesdaSoftworks || E3: http://www.e3expo.com/takeover || Schedule: http://nebtown.info/e3/#');
            break;
        case '!help' :
            bot.say(to, '!timer - for time left || !link - for links to streams and schedule');
            break;

    }
});

bot.addListener("ctcp", function (from,to,text,type,message) {
    if(text.startsWith("TIME")) {
        bot.say(from, helpers.getCount());
    }
});

bot.addListener("action", function(from, to, text, message) {
   if (text.contains("waves at {0}".format(config.botName)))
   {
        bot.action(to, "gives {0} a high five!".format(from));
   }
});
