const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'stop',
    description: "Stops the Music & clears the queue",
    usage: "?stop",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) {
            const stopError = new MessageEmbed()
                .setDescription("You Need to be in a Voice Channel to stop Music!")
                .setColor("RED")
            return message.channel.send({embeds: [stopError]})
        }
        
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({embeds: [queueError]});
        }
        queue.stop()

        const embed = new MessageEmbed()
            .setDescription('Stopped!')
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })

    }
}