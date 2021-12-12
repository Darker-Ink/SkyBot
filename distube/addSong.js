const {client} = require('../index.js');
const Discord = require('discord.js');

client.distube.on("addSong", (queue, song) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`${song.name}`)
    .setURL(`${song.url}`)
    .setColor(0x00AE86)
    .setDescription(`Added Song! Requested by ${song.user}`)
    .setThumbnail(`${song.thumbnail}`)
    .setTimestamp();
    queue.textChannel.send({embeds: [embed]});
})