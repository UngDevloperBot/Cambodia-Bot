// const { get } = require("snekfetch");

// module.exports.run = async(bot, message, args) => {
//     const { body } = await get("https://randomfox.ca/floof/");
//     await message.edit({
//       embed: {
//         "title": "🦊 | What does the Fox say ?",
//         "color": 6192321,
//         "image": {
//           "url": body.image
//         }
//       }
//     });

// }
const Discord = require("discord.js");
const client = new Discord.Client();
const cooldown = new Set()
const superagent = require('superagent');
exports.run = async (client, message, args) => {
          if (cooldown.has(message.author.id)) {
    return message.reply("Please wait 5 seconds a next command").then(message => {
     message.delete(5000) 
    })
    }
    cooldown.add(message.author.id);
    setTimeout(() => {
        cooldown.delete(message.author.id);
    }, 10000);
        let customemoji = client.emojis.find(r => r.name === '463763583864406056');
        if(!message.channel.guild) return message.reply(`This command is for guilds only! ${customemoji}`);
  let{body} = await superagent
  .get(`https://randomfox.ca/floof/`);
  let me = new Discord.RichEmbed()
  .setTitle("🦊 Fox incoming")
  .setColor("BLACK")
  .setImage(body.image);
  message.channel.send(me);
  }
