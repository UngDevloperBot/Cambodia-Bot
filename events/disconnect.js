const Discord = require("discord.js");


exports.run = async (bot) => {
    console.log("Bot disconnected...");
    let disconnected = bot.channels.get("502678448385556507");
let online = new Discord.RichEmbed()
    .setTitle('Bot is disconnected')
    .setColor("#ff1414")
    .setFooter(`${bot.user.tag}`) //FOOTER AND ICON
    .setTimestamp(); //SHOWS THAT COOL TIME ON THE FOOTER!
  disconnected.send(online);
  }
