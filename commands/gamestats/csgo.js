const Discord = require('discord.js');
var request = require('request');
var cheerio = require('cheerio');


function getStatData(location, $) {

    var selector = $('.stats-stat .value').eq(location).text();

    var stat_array = $.parseHTML(selector);

    var stat = 0;

    if (stat_array == null || stat_array.lengh == 0) {
        return -1;

    } else {
        stat = stat_array[0].data;
    }

    return stat;
}

exports.run = async (bot, message, args) => {

    if (args[0] === "team") {
        let team = [
            "I think **Terorist**",
            "Better would be **Counter Terorist**"
        ]
        let picker = Math.floor(Math.random() * team.length);

        return message.channel.send(team[picker]);
    }

    if (!args[0]) {
        return message.channel.send(`**Usage** - \`<prefix>csgo <username>\``);
    }


    var UR_L = "http://csgo.tracker.network/profile/" + args[0];
    request(UR_L, function (err, resp, body) {

        $ = cheerio.load(body);

        var KD = getStatData(0, $);
        if (KD == -1) {
            var privatembed = new Discord.RichEmbed() 
                .setAuthor(`Private Profile`)
                .setColor('RED')
                .setDescription('Your profile is private or does not exist , in order to access the order it follows the following steps :\n  \n 1 - `Go to  Steam Profile -> Edit Profile -> Privacy Settings -> My Profile needs to be Public, and Game Details needs to be public.` \n 2 - `Follow the gif.`')
                .setImage('https://media.giphy.com/media/6o7oFYyynPBOKe4UAe/giphy.gif');
                message.channel.send(privatembed)
                return;
        }

        var WIN = getStatData(1, $);
        var HS = getStatData(4, $);
        var MONEY = getStatData(5, $);
        var SCORE = getStatData(6, $);
        var KILLS = getStatData(7, $);
        var DEATHS = getStatData(8, $);
        var MVP = getStatData(9, $);
        var BS = getStatData(13, $);
        var BD = getStatData(14, $);
        var HR = getStatData(15, $);

        var STAT = new Discord.RichEmbed()

            .setTitle(`CSGO Stats`)
            .setColor('RED')
            .setDescription(`[Click here to be redirected to the profile](${UR_L})`)
            .addField("👑 Win", `${WIN}%`, true)
            .addField("🥇 Total KD", KD, true)
            .addField("🔫 Total Hostages Saved", HR, true)
            .addField("💸 Total Money", MONEY, true)
            .addField("💯 Total Score", SCORE, true)
            .addField("🔫 Total Kills", KILLS, true)
            .addField("💸 Total Deaths", DEATHS, true)
            .addField("🏆 MVP", MVP, true)
            .addField("💯 Bombs Set", BS, true)
            .addField("💸 Bombs Defused", BD, true)
            .addField("🏆 Total Headshots", HS, true)
            .setFooter('Special thanks to the CSGO tracker for API - © http://csgo.tracker.network™')
            .setImage(`http://gamesunited.net/wp-content/uploads/2017/08/CS_GO_trans_logo.png`)
            .setThumbnail(`https://lh6.googleusercontent.com/-UEgbN4YtSjM/AAAAAAAAAAI/AAAAAAAAALU/X45qK_cFRnQ/il/photo.jpg`);
        message.channel.send(STAT);

    })
}