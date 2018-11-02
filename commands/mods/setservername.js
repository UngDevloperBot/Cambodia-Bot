const Discord = require('discord.js');
var invisible = '#36393e'


exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌ This command is only for **Administrators**.').then(message => message.delete(3000));
    var arg = message.content.split(" ").slice(1);
    let name = arg.join(' ')
    var embed = new Discord.RichEmbed()
    .setTitle(`Changed Server's Name to **${name}** from **${message.guild.name}**.`)
    .setColor('RED')
    .setFooter(`Administrator : ${message.author.username}`)
    if(name < 3) {
        message.channel.send('Please choose a name with more than 2 characters.').then(message => message.delete(3000));
     } else {
        message.channel.send(embed) 
        message.guild.setName(name)
     }

}