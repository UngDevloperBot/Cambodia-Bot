const Discord = require('discord.js');
exports.run = (client, message, args, ops) => {
  let logs = message.guild.channels.find("name", "cambo-logs");
  if(!logs) return message.channel.send("** :x: | Could not find a cambo-logs channel.**");
  if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("** :x: | You dont have permissions!**");
  let user = message.mentions.users.first();
 	let modlog = client.channels.find('name', 'cambo-logs');
	let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
 	if (!muteRole) return message.reply("** :x: | There is no ``Muted`` Role.**");
 	if (message.mentions.users.size < 1) return message.channel.send('** :warning: | You must mention a user/member first.**');
  
  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole.id);
    message.channel.send("**:white_check_mark: | Member got unmuted!**").catch(console.error);
    var embed = new Discord.RichEmbed()
               .setThumbnail(message.author.avatarURl)
               .setColor("ORANGE")
               .addField('**● User Unmuted:** ', `${user}` , true)
               .addField('**● By:**' ,       ` <@${message.author.id}> ` , true)
               .setAuthor('Nameless | Mute')
               .setTimestamp()
               message.guild.channels.find('name', 'cambo-logs').send(embed)
  } else {
    return message.channel.send('**:x: | The member isnt muted.**');
  }
}
