const {client} = require('../index.js');
const Discord = require('discord.js');


client.distube.on("addList", (queue, playlist) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`${client.emotes.success} Added Playlist`)
        .setColor("GREEN")
        .addField("PlayList Name", `\`${playlist.name}\``, true)
        .addField("Amount Of Songs:", `${playlist.songs.length} Songs.`, true)
        .setTimestamp()
    queue.textChannel.send({
        embeds: [embed]
    })
})
