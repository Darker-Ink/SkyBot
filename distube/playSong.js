const {client} = require('../index.js');
const Discord = require('discord.js');

client.distube.on("playSong", (queue, song) => {
    const playSongEmbed = new Discord.MessageEmbed()
        .setTitle('Started Playing')
        .setDescription(`[${song.name}](${song.url})`)
        .addField('**Views:**', `${addCommas(song.views)}`, true)
        .addField('**Duration:**', `${song.formattedDuration}`, true)
        .addField('**Requested By:**', `${song.user}`, true)
        .setThumbnail(song.thumbnail)
        .setColor("BLUE")
    queue.textChannel.send({
        embeds: [playSongEmbed]
    })
})


// I want to take a number and add , to the right places

function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}