const Discord = require('discord.js');
exports.run = (client, message, args, ops) => {
  let logs = message.guild.channels.find("name", "cambo-logs");
  if(!logs) return message.channel.send("** :x: | Could not find a cambo-logs channel.**");
   if(!message.channel.guild) return message.reply('** :x: | You can use this command only on Servers.**');
  
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('** :x: | You dont have permissions.**');
      message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true
           }).then(() => {
               message.channel.send("** :white_check_mark: | Chat has been unmuted.**")
               var embed = new Discord.RichEmbed()
               .setThumbnail(message.author.avatarURl)
               .setColor("ORANGE")
               .addField('**● Channel unmuted:** ', `${message.channel}` , true)
               .addField('**● By:**' ,       ` <@${message.author.id}> ` , true)
               .setAuthor('Nameless | Mutechannel')
               .setTimestamp()
               message.guild.channels.find('name', 'cambo-logs').send(embed)
           });
}
