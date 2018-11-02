const Discord = require("discord.js");
var imageArray = [
    "https://media1.tenor.com/images/c22a247affcf4cd02c7d17f5a432cd95/tenor.gif",
    "https://media.giphy.com/media/pMT5VcMguh4Q0/giphy.gif",
    "https://media.giphy.com/media/t09NFbQCtQzza/giphy.gif",
    "https://media.giphy.com/media/fhkRUj3BWmMnu/giphy.gif",
    "https://78.media.tumblr.com/4a15356371670a3bfeb4d2d07ba81816/tumblr_mo1k7hDxVp1rzpynio1_500.gif",
    "https://pa1.narvii.com/5887/2a6b504d6f6a67f85ea405305372e64da95c879a_hq.gif",
    "http://gifimage.net/wp-content/uploads/2017/09/anime-bite-gif-4.gif",
    "http://pa1.narvii.com/5666/50debfff9508be43a39c3945cd078aedc6a680a2_hq.gif",
    "https://media1.tenor.com/images/6b42070f19e228d7a4ed76d4b35672cd/tenor.gif",
    "https://media1.tenor.com/images/a74770936aa6f1a766f9879b8bf1ec6b/tenor.gif",
    "https://78.media.tumblr.com/7e2cad3ab0432205cdd5c37fab83d977/tumblr_ojh7gzPyeB1uzwbyjo1_500.gif",
    "http://img1.ak.crunchyroll.com/i/spire3/105470d8f6fc8f277f511aada0e564c21488138818_full.gif"
];
module.exports.run = async (client, message, args) => {
    var bite = [Math.floor(Math.random() * imageArray.length)]
    var embedcolor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    if (message.mentions.users.first()) {
        const embed = new Discord.RichEmbed()
        .setDescription(''+ message.mentions.users.first() + ' you have been bitten by '+ message.author.toString())
        .setColor(embedcolor)
        .setImage(`${imageArray[bite]}`)
        .setFooter("Powered by Cambodia Bot")
        message.channel.send({embed: embed});
    } else {
        if (!message.mentions.users.first()) {
            const embed = new Discord.RichEmbed()
            .setDescription("Kushina bites you")
            .setColor(embedcolor)
            .setFooter("Powered by Cambodia Bot")
            .setImage(`${imageArray[bite]}`)
            message.channel.send({embed: embed});
        }
    }

}

module.exports.help = {
    name: "bite"
}
