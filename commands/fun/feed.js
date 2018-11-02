const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
message.react("✅");
 if (!message.mentions.users.first()) return message.channel.send(`Please mention someone!`).then(msg => {
      msg.delete(3000)
    });
  

  let {body} = await superagent
  .get(`https://nekos.life/api/v2/img/feed`);

  let feedembed = new Discord.RichEmbed()
  .setColor("#3a0be7")
  .setTitle(`${message.author.username} fed ${message.mentions.members.first().user.username}`)
  .setImage(body.url);

  message.channel.send(feedembed);

}

module.exports.help = {
  name: "feed"
}
