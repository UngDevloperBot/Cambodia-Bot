const Discord = require("discord.js");
const superagent = require("superagent");



module.exports.run = async (client, message, args) => {
  let {body} = await superagent
  .get(`https://nekos.life/api/v2/why`);

  let whyembed = new Discord.RichEmbed()
  .setColor("#3a0be7")
  .setTitle(`${message.author.username}, why though`)
  .setDescription(body.why);
  message.channel.send(whyembed);

}

module.exports.help = {
  name: "why"
}
