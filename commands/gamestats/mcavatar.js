const Discord = require('discord.js');
exports.run = (client, message, args, ops) => {
        if (!args[0]) return message.channel.send("** :warning: | Enter your Nickname.**");
        let image = new Discord.Attachment(`https://minotar.net/avatar/${args}`, `${args}.png`);
    message.channel.send(image)
    }

// thats all u need from what u typed before 
