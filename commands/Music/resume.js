const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'resume',
    description: "Resume Music",
    usage: '?resume',
    aliases: ['res'],
    category: "Music",
    run: async (client, message, args) => {
        let isPaused = await CheckPaused(client, message)
        if(!isPaused) return message.channel.send("Music is not paused")


        client.distube.resume(message)
        
        const embed = new MessageEmbed()
            .setDescription('Resumed!')
            .setColor("BLUE")

        message.channel.send({ embeds: [embed] })
    }
}