const Discord = require("discord.js");
const fs = require("fs");
const errors = require("../../utils/errors.js");

module.exports.run = async (bot, message, args, main) => {
  if (!message.member.hasPermission(["MANAGE_CHANNELS"])) {
    return errors.noPerms(message, "MANAGE_CHANNELS");
  }

  if (!message.mentions.channels.first()) {
    return message.channel.send("You need to provide a channel mention/tag. You can do this by using: \`#channel-name\`");
  } else {
    let toSet = message.mentions.channels.first().id;
    let toSetNAME = message.mentions.channels.first().name;
    let logChannel = JSON.parse(fs.readFileSync("./logchannel.json", "utf8"));

    logChannel[message.guild.id] = {
      channel: toSet
    }

    fs.writeFile("./logchannel.json", JSON.stringify(logChannel), (err) => {
      if (err) console.log(err);
    });

    let lcEmbed = new Discord.RichEmbed()
      .setColor(main)
      .setTitle("Succes!")
      .setDescription(`The logchannel is now set to ${toSetNAME} with channel ID: ${toSet}`)

    message.channel.send(lcEmbed);
  }
}

module.exports.help = {
  name: "setlog",
  aliases: ["setlogs", "logs", "log"]
}