const Discord = require("discord.js");
const snekfetch = require('snekfetch');
module.exports.run = async (client, message, args) => {
    const { body } = await snekfetch
            .get('http://www.rrrather.com/botapi');
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            const embed = new Discord.RichEmbed()
            .setTitle(`${body.title}...`)
            .setURL(body.link)
            .setColor(embedcolor)
            .setDescription(`${body.choicea} OR ${body.choiceb}?`)
            .setFooter("Powered by Cambodia bot");
            return message.channel.send({embed: embed});
}

module.exports.help = {
    name: "would-you"
}
