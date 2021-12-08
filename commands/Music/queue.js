const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    description: "Gives you the server queue list!",
    usage: "?queue",
    aliases: ["q"],
    category: "Music",
    disabledbug: true,
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({embeds: [queueError]});
        }

        queue = queue.songs;
        console.log(queue);
        let page = 1;
        if (args[0] && !isNaN(args[0])) page = Math.max(1, Math.min(args[0], Math.ceil(queue.length / 10)));
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(`Page ${page} of ${Math.ceil(queue.length / 10)}`)
            .setDescription(queue.slice((page - 1) * 10).slice(0, 10).map((song, i) => `**${i}** - [${song.name}](${song.url})`).join("\n"))
        let msg = await message.channel.send({embeds: [embed]});
        await msg.react("⬅");
        await msg.react("➡");
        const backwardsFilter = (reaction, user) => reaction.emoji.name === "⬅" && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === "➡" && user.id === message.author.id;
        const backwards = msg.createReactionCollector({ filter: backwardsFilter, time: 60000 });
        const forwards = msg.createReactionCollector({ filter: forwardsFilter, time: 60000 });
        backwards.on("collect", () => {
            if (page === 1) return;
            page--;
            embed.setFooter(`Page ${page} of ${Math.ceil(queue.length / 10)}`)
            embed.setDescription(queue.slice((page - 1) * 10).slice(0, 10).map((song, i) => `**${i}** - [${song.name}](${song.url})`).join("\n"))
            msg.edit({embeds: [embed]});
        });
        forwards.on("collect", () => {
            if (page === Math.ceil(queue.length / 10)) return;
            page++;
            embed.setFooter(`Page ${page} of ${Math.ceil(queue.length / 10)}`)
            embed.setDescription(queue.slice((page - 1) * 10).slice(0, 10).map((song, i) => `**${i}** - [${song.name}](${song.url})`).join("\n"))
            msg.edit({embeds: [embed]});
        });
    }}