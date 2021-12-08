const {client} = require('../index.js');

client.distube.on("playList", (queue, playlist) => {
    const embed = new Discord.MessageEmbed()
        .setTitle(`${client.emotes.success} Added Playlist`)
        .setColor("GREEN")
        .addField("PlayList Name", `\`${playlist.name}\``)
        .addField("Amount Of Songs:", `${playlist.songs.length} Songs.`)
        .setTimestamp()
    queue.textChannel.send({
        embeds: [embed]
    })
})
