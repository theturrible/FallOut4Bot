var irc = require("irc"),
    helpers = require("./helpers"),
    c = require("irc-colors"),
    env = require("node-env-file"),
    threequotes = [
        "Because one dog ain't enough, and two is too low, it's me, Three Dog!",
        "Hey everybody, this is Three Dog, your friendly neighborhood disc jockey. What's a disc? Hell if I know, but I'm gonna keep talking anyway.",
        "People of the Capital Wasteland, it is I, Three Dog, your ruler! Hear me, and obey! Oh sorry, that's that other radio station.",
        "Hey nifty America, it's me, your President John Hen-- Hahaa, gotcha! Three Dog here, how's everyone doin'?",
        "That's right, from Megaton to Girdershade, Paradise Falls to the Republic of Dave, we're coming to you loud and proud in a special live report.",
        "The Enclave, and that includes their homecoming king, \"President\" John Henry Eden and his gorilla, Colonel Augustus Autumn, are NOT here to help you.",
        "Now what if I, the all powerful Three Dog, bow-wow-wow, were to tell you that somewhere right here in the Capital Wasteland, is a place with lots of trees?"
    ];

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
        bot.say("##fallout",helpers.getCount());
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
        case '!hype' :
            bot.say(to,threequotes[Math.floor(Math.random()*threequotes.length)]);
            bot.say(to,c.rainbow("Three Dog",['red','white']));
            break;

    }
});

bot.addListener("ctcp", function (from,to,text,type,message) {
    if(text.startsWith("TIME")) {
        bot.say(from, helpers.getCount());
    }
});

bot.addListener("action", function(from, to, text, message) {
   if (text.startsWith("waves at {0}".format(config.botName)))
   {
        bot.action(to, "gives {0} a high five!".format(from));
   }
});
