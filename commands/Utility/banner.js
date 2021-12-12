const Discord = require('discord.js');
const fetch = require("node-fetch");
module.exports = {
    name: "banner",
    description: "To get someones banner",
    category: "Utility",
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0])
        const banner = fetch(`https://discord.com/api/v8/users/${user.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${client.token}`
            }
        }).then((res) => res.json()).then((user) => {

            let image = {
                gif: `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.gif?size=1024`,
                png: `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=1024`,
                none: null
            };

            if (user.banner.startsWith("a_")) return image.gif;
            else if (user.banner) return image.png;
            else return image.none;
        }).catch(() => null);
        if(!await banner) return message.channel.send("This user has no banner!")
        const embed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setTitle(`${user.username}'s banner`)
            .setImage(await banner)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send({embeds: [embed]});
    }
}