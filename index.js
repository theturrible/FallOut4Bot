var irc = require("irc"),
    helpers = require("./helpers.js"),
    c = require("irc-colors"),
    env = require("node-env-file");

// ENV File stuff
env(__dirname + '/.env');

// Configuration
var config = {
    channels: [process.env.channels],
    server: process.env.server,
    botName: process.env.nick
};

console.log(config.channels);

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
        bot.say("#oldschoolirc",helpers.getCount());
    }, 10800000)
});

// Watch for commands
bot.addListener("message#", function(from,to,text,message) {
    // Tech Echo command
    if(text.startsWith("!hello")) {
        bot.say(to, irc.colors.wrap("light_red","Hello " + from));
    }
    // Trigger the timer33333333333
    else if(text.startsWith("!timer")) {
        bot.say(to, helpers.getCount());
    } else if(text.startsWith("!annoy"))
    {
        bot.say(to,c.rainbow(text.stripFirst(),null));
    }
});

bot.addListener("action", function(from, to, text, message) {
   if (text.contains("waves at {0}".format(config.botName)))
   {
        bot.action(to, "gives {0} a high five!".format(from));
   }
});