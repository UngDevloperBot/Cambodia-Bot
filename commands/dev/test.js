const { Attachment } = require('discord.js');
const readFile = require('util').promisify(require('fs').readFile);
const { Canvas } = require('canvas-constructor');
const Canvass = require('canvas');

exports.run = async (client, msg, args) => {
	let user = msg.mentions.users.first() || client.users.get(args[0]);
	if(!user) user = msg.author;
	try{
		const paintMess = await msg.channel.send('🖌️ Painting...');
		const plate = await Canvass.loadImage('https://cdn.discordapp.com/attachments/503595863814438914/507113039934390273/plate_wanted.jpg');
		const png = user.avatarURL.replace(/\.gif.+/g, '.png');
		const { body } = await client.snek.get(png);
		const getWanted = new Canvass(400, 562)
		.setColor('#000000')
		.addRect(0, 0, 400, 562)
		.addImage(plate, 0, 0, 400, 562)
		.addImage(body, 86, 178, 228, 228)
		.toBuffer();
		await paintMess.delete();
		return msg.channel.send(new Attachment(getWanted, 'https://cdn.discordapp.com/attachments/503595863814438914/507113039934390273/plate_wanted.jpg'));
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
}

exports.conf = {
  aliases: [],
  clientPerm: 'ATTACH_FILES',
  authorPerm: ''
}

exports.help = {
  name: 'wanted',
  description: 'Post a wanted picture of a user.',
  usage: 'wanted [@user | id ]',
  example: ['wanted', 'wanted @yumeko', 'wanted 203733537282929']
}