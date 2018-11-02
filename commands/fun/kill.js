const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
message.react("✅");
    if(!args[0]){
        message.channel.send('Please specify a user.');
    }

    let user = message.mentions.users.first()
    if (user.id === message.author.id) {
        const buyEmb = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} commit suicide 🔪`)
            .setImage('https://media.giphy.com/media/duyjXZRLcczhm/giphy.gif')
        message.channel.send({ embed: buyEmb })
    }
    if(user.id !== message.author.id) {

        const candyEmb = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTitle(`${message.author.username} you killed ${user.username} 🔪`)
            .setImage('https://media.giphy.com/media/Lgr0bzQkU8iac/giphy.gif')
        message.channel.send({ embed: candyEmb })
        return;
    }

}