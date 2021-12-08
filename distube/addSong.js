const {client} = require('../index.js');
const Discord = require('discord.js');

client.distube.on("addSong", (queue, song) =>
    queue.textChannel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
)