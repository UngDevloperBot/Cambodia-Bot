const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

  let {body} = await superagent
  .get(`https://nekos.life/api/v2/img/waifu`);

  let generateembed = new Discord.RichEmbed()
  .setColor("#3a0be7")
  .setTitle(`Here's an automatically generated waifu~!`)
  .setImage(body.url);

  message.channel.send(generateembed);

}

module.exports.help = {
  name: "waifu"
}
