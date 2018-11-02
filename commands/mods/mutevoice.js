const Discord = require('discord.js');
exports.run = (client, message, args, ops) => {
    let logs = message.guild.channels.find("name", "cambo-logs");
  if(!logs) return message.channel.send("** :x: | Could not find a cambo-logs channel.**");
  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("** :x: | You dont have enough permissions.**");
  if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("** :x: | I dont have enough permissions.**");
  
   let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.channel.send('** :warning: | You must mention a user/member first.**');
      }
      muteMember.setMute(true);
      if(muteMember) {
        message.channel.sendMessage("** :white_check_mark: | User Voicemuted.**");
        var embed = new Discord.RichEmbed()
               .setThumbnail(message.author.avatarURl)
               .setColor("ORANGE")
               .addField('**● User Voicemuted:** ', `${muteMember}` , true)
               .addField('**● By:**' ,       ` <@${message.author.id}> ` , true)
               .setAuthor('Nameless | Voicemute')
               .setTimestamp()
               return message.guild.channels.find('name', 'cambo-logs').send(embed);
      }
}
