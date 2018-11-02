const Discord = require("discord.js");
const fs = require("fs");

module.exports.noPerms = (message, perm) => {
    let noPermsEmbed = new Discord.RichEmbed()
        .setTitle(":x: Insufficient permissions!")
        .addField("Missing permission:", perm)
        .setColor("#2A5B5F");

    message.channel.send(noPermsEmbed);
}

module.exports.userHasPerms = (message, perm) => {
    let userHasPermsEmbed = new Discord.RichEmbed()
        .setTitle(":x: User has permission!")
        .addField("User has permisison:", perm)
        .setColor("#2A5B5F");

    message.channel.send(userHasPermsEmbed);
}

module.exports.noMention = (message) => {
    let noMentionEmbed = new Discord.RichEmbed()
        .setTitle(":x: No mentioned member!")
        .setDescription("You didn't mention a user!")
        .setColor("#2A5B5F");

    message.channel.send(noMentionEmbed)
}