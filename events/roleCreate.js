const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
exports.run = (client, role, guild) => {
  
   var log = JSON.parse(fs.readFileSync("./serverlog.json", "utf8"))
 let logsetting = JSON.parse(fs.readFileSync("./serverlogonoff.json", "utf8"));
     if (!logsetting[member.guild.id]) {
   logsetting[member.guild.id] = {
     values: 1
      };
    }
    if(!log[member.guild.id]) return;  
    let values = logsetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var log = JSON.parse(fs.readFileSync("./serverlog.json", "utf8"))
    if (!log) return;
    let channel = member.guild.channels.get(`${log[member.guild.id].nick}`);
    if (!channel) return;
      
  //  if(!logChannel) return;
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var user0 = logs.entries.first().executor.displayAvatarURL;
        var user2 = logs.entries.first().executor.tag;
        let roleCreate = new Discord.RichEmbed()
        .setTitle('Cambodia Bot Logs')
        .setThumbnail("https://cdn.discordapp.com/attachments/463656921262587905/493190077111992320/747cff7e36d0b3404929b64c908cb437.jpg")
        .setDescription(`\n\nRole Created\n\n**Created By:** <@${userID}>\n\n**Role Name:** \`\`\`${role.name}\`\`\``)
        .setColor(role.guild.me.highestRole.color || '#faca00') 
        .setFooter(user2, user0)
        .setTimestamp()
        channel.send(roleCreate);
    })
  }
}