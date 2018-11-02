const fs = require("fs");
const Discord = require("discord.js");

module.exports = async (bot, channel) => {
    let logChannel = JSON.parse(fs.readFileSync("./logchannel.json", "utf8"));

    let embed = new Discord.RichEmbed()
        .setDescription("A new channel/category has been created.")
        .addField("Channel name:", channel.name)
        .setThumbnail("https://vignette.wikia.nocookie.net/i-shall-seal-the-heavens/images/2/2f/Plus.png/revision/latest?cb=20180221183139")
        .setColor("#2A5B5F")
        .setTimestamp()
        .setFooter("Million©", bot.user.avatarURL);

    if (channel.type == "dm") return;

    if (!logChannel[channel.guild.id]) {
        return;
    }

    try {
        let lc = logChannel[channel.guild.id].channel;
        let logchannel = bot.guilds.get(channel.guild.id).channels.get(lc);
        logchannel.send(embed);
    } catch (e) {
        return;
    }
}