const {MessageEmbed} = require("discord.js")

module.exports = {
    name: 'skip',
    description: "Skips Music in a Queue",
    usage: "?skip",
    aliases: [],
    category: "Music",
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("There is no Queue");
        if (!queue.songs[0]) return message.channel.send("There is no Song in Queue");
        const embed = new MessageEmbed()
            .setTitle("Skipped Song")
            .setColor("#ff0000")
            message.channel.send({embeds: [embed]});
            if(queue.songs.length <= 1) {
                return queue.stop()
            }
            queue.skip()
    }
}