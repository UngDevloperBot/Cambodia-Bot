const Discord = require("discord.js");
var imageArray = [
    "https://media1.tenor.com/images/ff2dcd44504000e320c21ae5682b5369/tenor.gif",
    "https://pa1.narvii.com/5748/8c6805c5fb2172cfdc445ef193a4527f4492012a_hq.gif",
    "http://i0.kym-cdn.com/photos/images/original/000/966/850/d79.gif"
];
module.exports.run = async (client, message, args) => {
  message.react("✅");
    let target = message.mentions.users.first() || message.author;
    var cuddle = [Math.floor(Math.random() * imageArray.length)]
    var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    const embed = new Discord.RichEmbed()
    .setDescription('Wasted! :smiling_imp:')
    .setColor(embedcolor)
    .setImage(`${imageArray[cuddle]}`)
    .setFooter("Powered by Cambodia Bot");
    message.channel.send({embed: embed});

}

module.exports.help = {
    name: "wasted"
}