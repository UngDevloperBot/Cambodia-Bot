const Discord = require("discord.js");
const superagent = require("superagent");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  message.react("✅");
if(message.author.bot) return;
   if (message.channel.type === 'dm') return message.reply('This Command Is Not Avaible In Dm\'s :x:');   
   message.channel.startTyping();
   var Canvas = module.require('canvas');
   var jimp = module.require('jimp');
   const w = ['https://cdn.discordapp.com/attachments/503595863814438914/506662874886701068/rip.png'];
   let Image = Canvas.Image,
   canvas = new Canvas(900, 946),
   ctx = canvas.getContext('2d');
   ctx.patternQuality = 'bilinear';
   ctx.filter = 'bilinear';
   ctx.antialias = 'subpixel';
   ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
   ctx.shadowOffsetY = 2;
   ctx.shadowBlur = 2;
   fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
	   if (err) return console.log(err);
	   let BG = Canvas.Image;
	   let ground = new Image;
	   ground.src = Background;
	   ctx.drawImage(ground, 0, 0, 900, 946);
})

   var ment = message.mentions.users.first();
   var getvalueof;
   if(ment){
	var getvalueof = ment;
} else {
   var getvalueof = message.author;
}
let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
jimp.read(url, (err, ava) => {
if (err) return console.log(err);
ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
if (err) return console.log(err);
let Avatar = Canvas.Image;
let ava = new Avatar;
ava.src = buf;
ctx.beginPath();
ctx.drawImage(ava, 260, 400, 280, 280);
message.channel.sendFile(canvas.toBuffer()).then(()=> { message.channel.stopTyping(); });       
})
})
}


module.exports.help = {
  name: "kiss"
}