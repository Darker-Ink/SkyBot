const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'queue',
    description: "Gives you the server queue list!",
    usage: "?queue",
    aliases: ["q"],
    category: "Music",
    run: async (client, message, args) => {
        let queue = client.distube.getQueue(message);
        if (!queue) {
            const queueError = new MessageEmbed()
                .setDescription("There is Nothing Playing")
                .setColor("RED")
            return message.channel.send({embeds: [queueError]});
        }

        queue = queue.songs;
        let page = 1;
        
        if (args[0] && !isNaN(args[0])) page = Math.max(1, Math.min(args[0], Math.ceil(queue.length / 10)));
        
        const row = new MessageActionRow()
        .addComponents(new MessageButton() .setCustomId("prev") .setLabel("Previous") .setStyle('PRIMARY') .setEmoji('⬅') )
        .addComponents( new MessageButton() .setCustomId("next") .setLabel("Next") .setStyle('PRIMARY') .setEmoji('➡'))
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Now Playing: " + queue[0].name)
            .setFooter(`Page ${page} of ${Math.ceil(queue.length / 10)}`)
            .setDescription(queue.slice((page - 1) * 10).slice(0, 10).map((song, i) => `**${i}** - [${song.name}](${song.url})`).join("\n"))
        
            let msg = await message.channel.send({embeds: [embed], components: [row]});

        const backwardsFilter = (i) => i.customId === "prev"

        const forwardsFilter = (i) => i.customId === "next"

        const backwards = msg.createMessageComponentCollector({ filter: backwardsFilter, time: 60000 });

        const forwards = msg.createMessageComponentCollector({ filter: forwardsFilter, time: 60000 });

        backwards.on("collect", (i, u) => {
            if(i.user.id != message.author.id) return i.reply({content: `Stop messing with ${message.author.username}'s buttons!`, ephemeral: true});
            
            if (page === 1) return i.reply({content: "You are on the first page!", ephemeral: true});
            
            page--;

            embed.setFooter(`Page ${page} of ${Math.ceil(queue.length / 10)}`)
            
            embed.setDescription(queue.slice((page - 1) * 10).slice(0, 10).map((song, i) => `**${i}** - [${song.name}](${song.url})`).join("\n"))
            
            i.update({embeds: [embed]});
        });

        forwards.on("collect", (i, u) => {
            console.log(i)
            if(i.user.id != message.author.id) return i.reply({content: `Stop messing with ${message.author.username}'s buttons!`, ephemeral: true});

            if (page === Math.ceil(queue.length / 10)) return i.reply({content: "You are on the last page!", ephemeral: true});
            page++;

            embed.setFooter(`Page ${page} of ${Math.ceil(queue.length / 10)}`)
            embed.setDescription(queue.slice((page - 1) * 10).slice(0, 10).map((song, i) => `**${i}** - [${song.name}](${song.url})`).join("\n"))
            
            i.update({embeds: [embed]});
        });
    }}