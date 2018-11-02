// Host
const http = require("http");
const express = require("express");
const app = express();
const YouTube = require('simple-youtube-api'); //DO NOT MODIFY 
const ytdl = require('ytdl-core'); //DO NOT MODIFY 
const ffmpeg = require('ffmpeg'); //DO NOT MODIFY 
const youtube = new YouTube('AIzaSyAPEceNnYOsJcVPw-nSuiibzHaLg8P9zwo'); //DO NOT MODIFY 
const queue = new Map(); //DO NOT MODIFY 
///////////////////////////////////////////////////////////////////////////////
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = client
bot.commands = new Discord.Collection();
const db = require("quick.db")
//var fs = require('fs');
//MMconst prefix = '//'; //This creates your prefix, which you put before a message to send a command.
const ownerID = '424916247696900135'
const botconfig = require("./botconfig.json");
const superagent = require("superagent");
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch");
const snekfetch = require("snekfetch");
//const Canvass = require('canvas');
const fs = require('fs');

fs.readdir("./events/", (err, files) => {
 
	if (err) console.log(err);
	files.forEach(file => {
		let eventFunc = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		bot.on(eventName, (...args) => eventFunc.run(bot, ...args));
	});
});




app.get("/", (request, response) => {
  console.log(`${new Date()} Cambodia bot Ping Received.`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


// bot.on("ready", () => { 
// console.log("ONLINE"); 
// });
// app.get("/", (request, response) => {
//  console.log(Date.now() + " Ping Received");
//   response.sendStatus(200);
// });
// app.listen(process.env.PORT);
// setInterval(() => {
//   http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 36000); //Pinging system.

// Ready event
client.on('ready', () => {
  console.log("Loading..");
  setTimeout(function(){
  console.log("Bot has been loaded completely.");
//     console.log(`${bot.user.tag} is online`);
//  // bot.user.setActivity('d!help ||d!invitebot||') 
// let onlinelogs = bot.channels.get("502678448385556507");
// let online = new Discord.RichEmbed()
//     .setTitle('Bot is Online')
//     .setColor("RANDOM")
//     .addField('Bot has restarted,', ` with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`)
//     .setFooter(`${bot.user.tag}`) //FOOTER AND ICON
//     .setTimestamp(); //SHOWS THAT COOL TIME ON THE FOOTER!
//   onlinelogs.send(online);
  }, 1000);

  
  
// Bot Status
// function botStatus() {
//   // let status = [
//   //   `my default prefix ${botconfig.prefix}`,
//   //   `in ${client.guilds.size} guilds.`,
//   //   `with A Coder's Hangout team.`,
//   //   `mention me!!`,
//   //   `with ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users.`
//   // ];
//  // let rstatus = Math.floor(Math.random() * status.length);
//  // client.user.setActivity(status[rstatus], {Type: 'STREAMING'});        
// }; setInterval(botStatus, 20000)
  // setInterval(() => {
  //   //dbl.postStats(bot.guilds.size)
  // }, 1800000);
});



// Message event
client.on("message", async message => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  };
	
let prefix = prefixes[message.guild.id].prefixes;
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return;
   

// Bot Mention Embed
  if(message.content.toLowerCase() === `<@${client.user.id}>`){
    let embed = new Discord.RichEmbed()
    .setTitle("Cambodia bot")
    .addField("Prefix", `${prefix}`, true)
    .addField("Help", `${prefix}help`, true)
    .setThumbnail(client.user.displayAvatarURL)
    .setColor(`${message.guild.me.displayHexColor!=='#00000000' ? message.guild.me.displayHexColor : 0xffffff}`);
    message.channel.send(embed);
  };

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix;
  

  try {
	let commandFile = require(`./commands/fun/${cmd}.js`);
	commandFile.run(bot, message, args);

    let fun = bot.channels.get("501972813373112320");
  
  let log = new Discord.RichEmbed()
    .setTitle('fun command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  fun.send(log);
	} catch (e) {
  
}
  	try {
	let commandFile = require(`./commands/mods/${cmd}.js`);
	commandFile.run(bot, message, args);

    let mods = bot.channels.get("501972267224268810");
  
  let log = new Discord.RichEmbed()
    .setTitle('mods command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  mods.send(log);
	} catch (e) {
  }
	try {
	let commandFile = require(`./commands/dev/${cmd}.js`);
	commandFile.run(bot, message, args);

    let dev = bot.channels.get("501970835821559809");
  
  let log = new Discord.RichEmbed()
    .setTitle('dev command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  dev.send(log);
	} catch (e) {

}
    	try {
	let commandFile = require(`./commands/help/${cmd}.js`);
	commandFile.run(bot, message, args);

    let help = bot.channels.get("502012419846045706");
  
  let log = new Discord.RichEmbed()
    .setTitle('help command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  help.send(log);
	} catch (e) {
  }
      	try {
	let commandFile = require(`./commands/nsfw/${cmd}.js`);
	commandFile.run(bot, message, args);

    let nsfw = bot.channels.get("502028942589558786");
  
  let log = new Discord.RichEmbed()
    .setTitle('nsfw command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  nsfw.send(log);
	} catch (e) {
  }
      	try {
	let commandFile = require(`./commands/info/${cmd}.js`);
	commandFile.run(bot, message, args);

    let info = bot.channels.get("502029520442753035");
  
  let log = new Discord.RichEmbed()
    .setTitle('info command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  info.send(log);
	} catch (e) {
  }
       	try {
	let commandFile = require(`./commands/gamestats/${cmd}.js`);
	commandFile.run(bot, message, args);

    let gamestats = bot.channels.get("502029902334132226");
  
  let log = new Discord.RichEmbed()
    .setTitle('gamestats command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  gamestats.send(log);
	} catch (e) {
  }
         	try {
	let commandFile = require(`./commands/image/${cmd}.js`);
	commandFile.run(bot, message, args);

    let image = bot.channels.get("502048503867113482");
  
  let log = new Discord.RichEmbed()
    .setTitle('image command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  image.send(log);
	} catch (e) {
  }
          	try {
	let commandFile = require(`./commands/general/${cmd}.js`);
	commandFile.run(bot, message, args);

    let image = bot.channels.get("502048503867113482");
  
  let log = new Discord.RichEmbed()
    .setTitle('image command')
    .setColor("RANDOM")
    .addField('Cambodia Bot', `----------------\nCommand: ${cmd}\nRan by: ${message.author.tag}\n----------------`)
    .addField('commands from server', `Name: **${message.guild.name}** \nID of server: **${message.guild.id}**`)
    .setFooter(`${bot.user.tag}`)
    .setTimestamp();

  image.send(log);
	} catch (e) {
  }


  
  
  
  
});












//Youtube MUsic COmmands
var servers = {};
bot.on("message", async message => {
   if (message.channel.type == "dm") return;
  
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  };
  
    let prefix = prefixes[message.guild.id].prefixes;
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    var searchString = args.slice(1).join(' ');
    var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
       //PLAY COMMAND 1
        case "play":
            var voiceChannel = message.member.voiceChannel;
            var error7 = new Discord.RichEmbed().setColor("990033")
                .setDescription('**I\'m sorry but you need to be in a voice channel to play music!**')
                .setColor(0x86e734)
            if (!voiceChannel) return message.channel.send(error7).then(msg => {
                msg.delete(25000)
            });
            var permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                var error5 = new Discord.RichEmbed().setColor("990033")
                    .setDescription('**I cannot connect to your voice channel, make sure you are in the Music #2 Channel!**')
                    .setColor(0x86e734)
                return message.channel.send(error5).then(msg => {
                    msg.delete(25000)
                });
            }
            if (!permissions.has('SPEAK')) {
                var error6 = new Discord.RichEmbed().setColor("990033")
                    .setDescription('**I cannot speak in this voice channel, make sure you are in the Music #2 Channel!**')
                    .setColor(0x86e734)
                return message.channel.send(error6).then(msg => {
                    msg.delete(25000)
                });
            }
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                var playlist = await youtube.getPlaylist(url);
                var videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        var index = 0;

                        var playing = new Discord.RichEmbed().setColor("990033")
                            .setDescription(`=>${videos.map(video2 => `\`${++index}\` - [${video2.title}](${video2.url})`).join('\n =>')}`)
                            .setFooter(`Please provide a value to select one of the search results ranging from 1-10.`)
                            .setColor(0x86e734)
                        message.channel.send(playing).then(msg => {
                            msg.delete(10000)
                        });
                        // ESLINT-DISABLE-NEXT-LINE MAX-DEPTH
                        try {
                            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            var error2 = new Discord.RichEmbed().setColor("990033")
                                .setDescription('**No or invalid value entered, cancelling video selection.**')
                                .setColor(0x86e734)
                            return message.channel.send(error2);
                        }
                        var videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        var error1 = new Discord.RichEmbed().setColor("990033")
                            .setDescription('**I could not obtain any search results.**')
                            .setColor(0x86e734)
                        return message.channel.send(error1);
                    }
                }
                return handleVideo(video, message, voiceChannel);
            }
            break;
         //PLAY COMMAND 2
        case "p":
            var voiceChannel = message.member.voiceChannel;
            var error7 = new Discord.RichEmbed().setColor("990033")
                .setDescription('**I\'m sorry but you need to be in a voice channel to play music!**')
                .setColor(0x86e734)
            if (!voiceChannel) return message.channel.send(error7).then(msg => {
                msg.delete(25000)
            });
            var permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has('CONNECT')) {
                var error5 = new Discord.RichEmbed().setColor("990033")
                    .setDescription('**I cannot connect to your voice channel, make sure you are in the Music #2 Channel!**')
                    .setColor(0x86e734)
                return message.channel.send(error5).then(msg => {
                    msg.delete(25000)
                });
            }
            if (!permissions.has('SPEAK')) {
                var error6 = new Discord.RichEmbed().setColor("990033")
                    .setDescription('**I cannot speak in this voice channel, make sure you are in the Music #2 Channel!**')
                    .setColor(0x86e734)
                return message.channel.send(error6).then(msg => {
                    msg.delete(25000)
                });
            }
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                var playlist = await youtube.getPlaylist(url);
                var videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }
                return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
            } else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 10);
                        var index = 0;

                        var playing = new Discord.RichEmbed().setColor("990033")
                            .setDescription(`=>${videos.map(video2 => `\`${++index}\` - [${video2.title}](${video2.url})`).join('\n =>')}`)
                            .setFooter(`Please provide a value to select one of the search results ranging from 1-10.`)
                            .setColor(0x86e734)
                        message.channel.send(playing).then(msg => {
                            msg.delete(10000)
                        });
                        // ESLINT-DISABLE-NEXT-LINE MAX-DEPTH
                        try {
                            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            var error2 = new Discord.RichEmbed().setColor("990033")
                                .setDescription('**No or invalid value entered, cancelling video selection.**')
                                .setColor(0x86e734)
                            return message.channel.send(error2);
                        }
                        var videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        var error1 = new Discord.RichEmbed().setColor("990033")
                            .setDescription('**I could not obtain any search results.**')
                            .setColor(0x86e734)
                        return message.channel.send(error1);
                    }
                }
                return handleVideo(video, message, voiceChannel);
            }
            break;
            //SKIP COMMAND 1
        case "skip":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send(nothing);
            serverQueue.connection.dispatcher.end('Skip command has been used!');
            return undefined;
            break;
           //SKIP COMMAND 2
        case "s":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send(nothing);
            serverQueue.connection.dispatcher.end('Skip command has been used!');
            return undefined;
            break;
            //STOP COMMAND
        case "stop":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send(nothing);
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end('Stop command has been used!');
            return undefined;
            break;
            //VOLUME COMMAND 1

            //WIP
        case "volume":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send(nothing);
            if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            var volval;
            if (serverQueue.volume == 1) {
                volval = `:loud_sound: ○──── ⠀`
            }
            if (serverQueue.volume == 2) {
                volval = `:loud_sound: ─○─── ⠀`
            }
            if (serverQueue.volume == 3) {
                volval = `:loud_sound: ──○── ⠀`
            }
            if (serverQueue.volume == 4) {
                volval = `:loud_sound: ───○─ ⠀`
            }
            if (serverQueue.volume == 5) {
                volval = `:loud_sound: ────○ ⠀`
            }
            message.channel.send(volval).then(msg => {
                msg.delete(10000)
            });
            break;
          //VOLUME COMMAND 2

            //WIP
        case "vol":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
            if (!serverQueue) return message.channel.send(nothing);
            if (!args[1]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
           var volval;
            if (serverQueue.volume == 1) {
                volval = `:loud_sound: ○──── ⠀`
            }
            if (serverQueue.volume == 2) {
                volval = `:loud_sound: ─○─── ⠀`
            }
            if (serverQueue.volume == 3) {
                volval = `:loud_sound: ──○── ⠀`
            }
            if (serverQueue.volume == 4) {
                volval = `:loud_sound: ───○─ ⠀`
            }
            if (serverQueue.volume == 5) {
                volval = `:loud_sound: ────○ ⠀`
            }
            message.channel.send(volval).then(msg => {
                msg.delete(10000)
            });
            break;
            //NOW PLAYING COMMAND
      case "nowplaying": case "np":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (!serverQueue) return message.channel.send(nothing);
         var volval;
            if (serverQueue.volume == 1) {
                volval = `:loud_sound: ○──── ⠀`
            }
            if (serverQueue.volume == 2) {
                volval = `:loud_sound: ─○─── ⠀`
            }
            if (serverQueue.volume == 3) {
                volval = `:loud_sound: ──○── ⠀`
            }
            if (serverQueue.volume == 4) {
                volval = `:loud_sound: ───○─ ⠀`
            }
            if (serverQueue.volume == 5) {
                volval = `:loud_sound: ────○ ⠀`
            }
         
            var NowEmbed = new Discord.RichEmbed().setColor("990033")
                .setDescription(`Now playing:<a:youtube:494230063143714847> **[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})**<a:demoparty:494369882968948736>`)
                .setColor(0x86e734)
                 .addField(`**===================================**`,`
◄◄⠀▐▐ ⠀►►⠀　${volval}    :gear: ❐ ⊏⊐ 
**===================================**`)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}.\n -Invite Me! Using d!invitebot`)
            .setTimestamp()
            return message.channel.send(NowEmbed);
            break;
            //QUEUE COMMAND 1
        case "queue":
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
            break;
        //QUEUE COMMAND 2
        case "q":
            if (!serverQueue) return message.channel.send('There is nothing playing.');
            return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
            break;
            //PAUSE COMMAND
        case "pause":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return message.channel.send('⏸ Paused the music for you!');
            }
            return message.channel.send(nothing);
            break;
        
            //RESUME MUSIC COMMAND
        case "resume":
            var nothing = new Discord.RichEmbed().setColor("990033")
                .setDescription('**There is nothing playing.**')
                .setColor(0x86e734)
            if (serverQueue && !serverQueue.playing) {
                serverQueue.playing = true;
                serverQueue.connection.dispatcher.resume();
                return message.channel.send('▶ Resumed the music for you!');
            }
            return message.channel.send(nothing);


            return undefined;
            break;
    }
    //VIDEO HANDLER 
    async function handleVideo(video, message, voiceChannel, playlist = false) {
        var serverQueue = queue.get(message.guild.id);
        console.log(video);
        //META DATA
        var song = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        if (!serverQueue) {
            var queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };

            queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                queue.delete(message.guild.id);
                return message.channel.send(`I could not join the voice channel: ${error}`);
            }
        } else {
            serverQueue.songs.push(song);
            console.log(serverQueue.songs);
            if (playlist) return undefined;
            else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
        }
        return undefined;
    }

    function play(guild, song) {
        var serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', reason => {
                message.channel.send('``The queue of song is end.``');
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            }).on('error', error => console.error(error));
        var volval;
            if (serverQueue.volume == 1) {
                volval = `:loud_sound: ○──── ⠀`
            }
            if (serverQueue.volume == 2) {
                volval = `:loud_sound: ─○─── ⠀`
            }
            if (serverQueue.volume == 3) {
                volval = `:loud_sound: ──○── ⠀`
            }
            if (serverQueue.volume == 4) {
                volval = `:loud_sound: ───○─ ⠀`
            }
            if (serverQueue.volume == 5) {
                volval = `:loud_sound: ────○ ⠀`
            }
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
         let sicon = message.guild.iconURL;
       var NowEmbed = new Discord.RichEmbed().setColor("990033")
            .setAuthor(message.guild.name, sicon)
            .setDescription(`Now playing:<a:youtube:494230063143714847>**[${song.title}](${song.url})**<a:demoparty:494369882968948736>`)
        
            .addField(`**===================================**`,`
◄◄⠀▐▐ ⠀►►⠀　${volval}    :gear: ❐ ⊏⊐ 
**===================================**`)
            .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}.\n - Invite Me! Using d!invitebot`)
            .setColor(0x86e734)
            .setTimestamp()
        serverQueue.textChannel.send("Loading song...").then(msg => {
            msg.edit(NowEmbed)
        });

    }

  
});


bot.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak error saat ada yang join
		autorole[member.guild.id] = {
			autorole: botconfig.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (role === '0') return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
	member.addRole(role);

	

});
/*
bot.on("guildMemberAdd", async (member, client, message, args, level) => {  
	   var imageArray = [
    "https://cdn.discordapp.com/attachments/501962989499318273/502528342109454337/pexels-photo-414586.jpg",
    "https://cdn.discordapp.com/attachments/503595863814438914/503596835181690909/download.jpg",
    "https://cdn.discordapp.com/attachments/501962989499318273/502529564573040640/276517-free-nature-background-2560x1600-for-xiaomi.jpg",
    "https://cdn.discordapp.com/attachments/503595863814438914/503597097044672537/images.jpg",
    "https://cdn.discordapp.com/attachments/503595863814438914/503597234173116427/images.jpg",
    "https://cdn.discordapp.com/attachments/503595863814438914/503597510195937282/images.jpg",
    "https://cdn.discordapp.com/attachments/503595863814438914/503597707126898688/images.jpg"
];
   var cuddle = [Math.floor(Math.random() * imageArray.length)]
  const guild = member.guild;
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;

            var {body: background} = await superagent.get(`${imageArray[cuddle]}`);
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));


            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
              .setColor('#ffffff')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('32px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addText(`Welcome To ${guild.name}`, 260, 295)
              .addText(`${jadim}#${member.user.discriminator}`, 260, 325)
	      .addText(`You are the ${member.guild.memberCount} Member!`, 260, 355)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
  
            channel.send(`Welcome To **${guild.name}**, **${member}** Hope You Enjoy In This Server\nYou are the **${member.guild.memberCount}** Member!`)+channel.send(new Discord.Attachment(await createCanvas()));
    }
});*/
const Canvass = require('canvas');
//const snekfetch = require('snekfetch');

const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

	
client.on("guildMemberAdd", async (member, client, message, args, level) => {  
  
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
      
	    var imageArray = [
       "https://cdn.discordapp.com/attachments/505470017295351848/505473047969398784/no-translate-detected_1297-85.jpg",
       "https://cdn.discordapp.com/attachments/505470017295351848/505473054793531412/floral-green-colorful-background-vector.jpg",
       "https://cdn.discordapp.com/attachments/505470017295351848/505473066445439009/luz-verde-natureza-cor-poligono-desenho-de-fundo-abstrato-geometrico-origami-estilo_9028-16.jpg",
       "https://cdn.discordapp.com/attachments/505470017295351848/505473079380803584/background-1561710_960_720.jpg",
       "https://cdn.discordapp.com/attachments/505470017295351848/505473088486637568/rainbow-background-2-big.jpg",
       "https://cdn.discordapp.com/attachments/505470017295351848/505473467559444501/images.jpg",
       "https://cdn.discordapp.com/attachments/505470017295351848/505473480750268446/istockphoto-888994838-640x640.jpg",
       "https://cdn.discordapp.com/attachments/501409836227887105/505628408110252033/mnqJKw.jpg"
];
      var cuddle = [Math.floor(Math.random() * imageArray.length)]
      const guild = member.guild;
  //	const channel = member.guild.channels.find(ch => ch.name === 'wel-test');
//	if (!channel) return;

	const canvas = Canvass.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	
  const background = await Canvass.loadImage(`${imageArray[cuddle]}`);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Welcome To ${guild.name}`, canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
      

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvass.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

//	channel.send(`Welcome to the server, ${member}!`, attachment);

	channel.send(`Welcome To **${guild.name}**,You are the **${member.guild.memberCount}** Member!`, attachment);
         //   channel.send(`Welcome To **${guild.name}**, **${member}** Hope You Enjoy In This Server\nYou are the **${member.guild.memberCount}** Member!`);
    }
});

bot.on('guildMemberAdd', async member => {
  let guild = member.guild;
  let autonick = JSON.parse(fs.readFileSync("./autonick.json", "utf8"));
  if(!autonick[member.guild.id]) return;
  
   var autonicksetting = JSON.parse(fs.readFileSync("./autonickonoff.json", "utf8"));
    if (!autonicksetting[member.guild.id]) {
     autonicksetting[member.guild.id] = {
      values: 1
      };
    }
  
    var values = autonicksetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
      let newNick = autonick[member.guild.id].nick
      newNick = newNick.replace('{username}', member.user.username)
      member.guild.members.get(`${member.user.id}`).setNickname(newNick)
    }
});
bot.on("guildMemberRemove", async (member, client, message, args, level) => {  
            var namam = member.user.username
            var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
            async function createCanvas() {
            var imageUrlRegex = /\?size=2048$/g;
              
            var {body: background} = await superagent.get("https://cdn.discordapp.com/attachments/425626649359548426/502041743815082004/welcomer_425624544552681472-470985330653397003.png");
            var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));

            return new Canvas(856, 376)
              .addImage(avatar, 100, 50, 256, 256, 128)
              .setColor('#ffffff')
              .setTextFont('50px System')
              .setTextAlign('center')
              .setTextFont('32px Arial')
              .addImage(background, 0, 0, 856, 376)
              .addText("Goodbye", 260, 295)
              .addText(`${jadim}#${member.user.discriminator}`, 260, 325)
	      .addText(`Member Count: ${member.guild.memberCount}`, 260, 355)
              .addRoundImage(avatar, 135, 10, 256, 256, 128)
              .toBufferAsync();
            }
  var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
 let welcomesetting = JSON.parse(fs.readFileSync("./welcomeonoff.json", "utf8"));
     if (!welcomesetting[member.guild.id]) {
    welcomesetting[member.guild.id] = {
     values: 1
      };
    }
    if(!welcome[member.guild.id]) return;  
    let values = welcomesetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./welcome.json", "utf8"))
    if (!welcome) return;
    let channel = member.guild.channels.get(`${welcome[member.guild.id].nick}`);
    if (!channel) return;
  
           // channel.send(`**Selamat Tinggal** ${member} **Jangan Lupa Berkunjung Kembali Ya :) **`)+channel.send(new Discord.Attachment(await createCanvas()));
    }
});
/*
//log
client.on("roleCreate", rc => {
  const channel = rc.guild.channels.find("name", "cambo-logs") 
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(rc.guild.name)
  .setDescription(`***Created Role Name : *** **${rc.name}** `)
  .setColor(`ORANGE`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });
  //By S Codes
  client.on("roleDelete",  rd => {
  let channel = rd.guild.channels.find("name", "cambo-logs")
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(rd.guild.name)
  .setDescription(`***Deleted Role Name : *** **${rd.name}** `)
  .setColor(`ORANGE`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });

client.on("channelCreate",  cc => {
  var channel = cc.guild.channels.find("name", "cambo-logs")
  if(channel) {
  let embed = new Discord.RichEmbed()
  .setTitle(cc.guild.name)
  .setDescription(`***Channel Created Name : *** **${cc.name}** ⬅️`)
  .setColor(`ORANGE`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });

   client.on("deleteChannel",  dc => {
  const channel = dc.guild.channels.find("name", "cambo-logs")
  if(channel) {
  var embed = new Discord.RichEmbed()
  .setTitle(dc.guild.name)
  .setDescription(`***Channel Deleted Name : *** **${dc.name}** ⬅️`)
  .setColor(`ORANGE`)
  .setTimestamp(); 
  channel.sendEmbed(embed)
  }
  });
  
  
  
  client.on('messageUpdate', (message, newMessage) => {
    if (message.content === newMessage.content) return;
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'cambo-logs');
    if (!channel) return;

    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('ORANGE')
       .setDescription(`✏ **Edit message
       Send it <@${message.author.id}>                                                                                                                         Changed in Chat** <#${message.channel.id}>\n\nBefor Editing:\n \`${message.cleanContent}\`\n\nAfter Editing:\n \`${newMessage.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});


});

client.on('messageDelete', message => {
    if (!message || !message.id || !message.content || !message.guild || message.author.bot) return;
    const channel = message.guild.channels.find('name', 'cambo-logs');
    if (!channel) return;
    
    let embed = new Discord.RichEmbed()
       .setAuthor(`${message.author.tag}`, message.author.avatarURL)
       .setColor('ORANGE')
       .setDescription(`🗑️ **Deleted message**
**Send it <@${message.author.id}>                                                                                                                        Deleted in Chat** <#${message.channel.id}>\n\n \`${message.cleanContent}\``)
       .setTimestamp();
     channel.send({embed:embed});

});*/

///////
const applyTexts = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.find(ch => ch.name === 'wel-test');
	if (!channel) return;

	const canvas = Canvass.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	
  const background = await Canvass.loadImage('https://cdn.discordapp.com/attachments/503595863814438914/503597707126898688/images.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyTexts(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
	const avatar = await Canvass.loadImage(buffer);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});
///////antilinks///////
   
 const al = require("./antilinks.json");
  
  
  
  client.on('message', message => {
	
      var sender = message.author
      if (!message.channel.guild) return;
      if (message.author.bot) return null;
  
      if (!al[message.guild.id]) al[message.guild.id] = {
          onoff: 'Off'
      }
  
      if (message.content === message.prefix+'antiinfo') {
      if(!message.channel.guild) return message.reply('This command only for servers');
          let perms = message.member.hasPermission(`MANAGE_GUILD`)
          if (!perms) return message.reply(`You don't have permissions: Manage Guild.`)
          var embed = new Discord.RichEmbed()
              .setDescription(`Now antilinks state is : ${al[message.guild.id].onoff}`)
              .setColor(`BLACK`)
          message.channel.send({
              embed
          })
      }
      if (message.content === message.prefix+'antilinks') {
      if(!message.channel.guild) return message.reply('This command only for servers');
          let perms = message.member.hasPermission(`MANAGE_GUILD`)
          if (!perms) return message.reply(`You don't have permissions`)
          let args = message.content.split(" ").slice(1)
          if (!args.join(" ")) {
              if (al[message.guild.id].onoff === 'Off') return [message.channel.send(`The Antlinks event has been toggled to On!🛡`), al[message.guild.id].onoff = 'On']
              if (al[message.guild.id].onoff === 'On') return [message.channel.send(`The Antilinks event has been toggled to Off!🛡 ❎`), al[message.guild.id].onoff = 'Off'] //:D
  
          }
      }
      if (message.content.includes('https://discord.gg/','https://discordapp.com/invite')) {
          if (al[message.guild.id].onoff === 'Off') return
          if (message.member.hasPermission('ADMINISTRATOR')) return;
          message.delete()
          return message.reply(`Advertising isn't allowed here ! 💨`)
      }
     
      fs.writeFile("./antilinks.json", JSON.stringify(al), (err) => {
          if (err) console.error(err)
      });
  });

///////
bot.login(process.env.TOKEN);