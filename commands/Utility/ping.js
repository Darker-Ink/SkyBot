const Discord = require('discord.js')
const ms = require('ms')
const os = require('os')
module.exports = {
    name: "ping",
    description: "check the bots heartBeat",
    cooldown: 0,
    category: "Utility",
    run: async (client, message, args) => {
        const dt = new Date(message.createdTimestamp);
        const responses = [
    'I-It\'s not like I wanted to say pong or anything...',
    'Pong...',
    'Woo! A secret command!',
    'Ping! ...I mean **pong!**',
    'Does anyone even use this?',
    'At your service!',
    'Testing, testing, 1, 2, 3!'
  ];
        const dresponses = responses[Math.floor(Math.random() * responses.length)];
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Pinging...`)
        const pmsg = await message.channel.send({embeds: [embed]})
        const ping = pmsg.createdTimestamp - message.createdTimestamp;
        const embed2 = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Pong!`)
        .setFooter(`${dresponses}`)
        .addField(`Ping:`, `${ptype(ping)}`)
        .addField(`API:`, `${ptype(Math.round(client.ws.ping))}`)
        pmsg.edit({embeds: [embed2]})
    }}


function ptype(ping) {
    if (ping < 120) return '<:green:849844528680796200> ' + ping + 'ms';
    if (ping < 500) return '<:orange:849844491342839868>' + ping + 'ms';
    return '<:red:849844404235927613>' + ping + 'ms';
}
