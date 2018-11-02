const Discord = require("discord.js");
const snekfetch = require('snekfetch');
module.exports.run = async (client, message, args) => {
    const { text } = await snekfetch
            .get('http://history.muffinlabs.com/date');
            const body = JSON.parse(text);
            const events = body.data.Events;
            const event = events[Math.floor(Math.random() * events.length)];
            var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
            const embed = new Discord.RichEmbed()
            .setColor(embedcolor)
            .setURL(body.url)
            .setTitle(`On this day (${body.date})...`)
            .setDescription(`${event.year}: ${event.text}`)
            .setFooter("Powered by Cambodia Bot");
            return message.channel.send({embed: embed});
}

module.exports.help = {
    name: "today"
}
