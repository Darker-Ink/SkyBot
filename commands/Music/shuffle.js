const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
module.exports = {
    name: 'shuffle',
    description: "Pause Music",
    usage: "?pause",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("There is no music playing");

        client.distube.shuffle(message)
        const mbed = new MessageEmbed()
            .setDescription("Shuffled the Queue")
            .setColor("GREEN")
        return message.channel.send({embeds: [mbed]})
    }
}