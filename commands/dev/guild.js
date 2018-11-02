const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
if (message.author.id !== ('424916247696900135')) return message.channel.send("**You Can\'t Use This command**");
  let msg =  bot.guilds.map(guild => `**${guild.name}** Members: ${guild.memberCount}`).join('\n');
  let embed = new Discord.RichEmbed()
  .setTitle(`I am in ${bot.guilds.size} guilds!`)
  .setDescription(`${msg}`)
  .setColor("#ebf442")
  .setFooter('Powered by Dragon')
  .setTimestamp();
  message.channel.send(embed);
}

module.exports.help = {
  name: "guild"
}

