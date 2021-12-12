const {MessageEmbed} = require("discord.js")
const {CheckPaused} = require("../../Utils/CheckPaused.js")

module.exports = {
    name: 'pause',
    description: "Pause Music",
    usage: "?pause",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        let isPaused = await CheckPaused(client, message)
        if(isPaused) return message.channel.send("Music is already paused!")
        client.distube.pause(message)
        const embed = new MessageEmbed()
            .setDescription('Paused!')
            .setColor("BLUE")
        message.channel.send({embeds: [embed]})
    }
}