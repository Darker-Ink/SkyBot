const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'volume',
    description: "Changes Volume of the currently playing Music!",
    usage: "?volume <number from 1 to 100>",
    aliases: ['vol', 'v'],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({
                embeds: [queueError]
            });
        }
        if (isNaN(args[0])) return message.channel.send("Please provide a valid number from 1 to 100");
        let volume = parseInt(args[0]);

        client.distube.setVolume(message, volume)
        const embed = new MessageEmbed()
            .setDescription(`Volume has been set to \`${volume}%\``)
            .setColor("BLUE")
        message.channel.send({
            embeds: [embed]
        })

    }
}