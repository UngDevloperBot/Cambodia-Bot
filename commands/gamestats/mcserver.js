//MC server Stats 
const Discord = require('discord.js');
exports.run = (client, message, args, ops) => {
  const port = '25565'
    if (!args[0]) return message.channel.send("** :warning: | Enter the Server Domain/IP.**");
        let embed = new Discord.RichEmbed()
        .setColor('ORANGE')
        .setThumbnail(`https://api.minetools.eu/favicon/${args}/25565`)
        .addField(":scroll: Server Name",`${args}`,true)
        .addField(":globe_with_meridians: Server Port",`${port}`)
        .setImage(`http://status.mclive.eu/${args}/${args}/25565/banner.png`)
        .setFooter(`${client.user.username}`)
        .setTimestamp()
        message.channel.send(embed)      
};
