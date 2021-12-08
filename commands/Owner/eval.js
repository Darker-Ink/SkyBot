const {
    MessageEmbed
} = require('discord.js');
const {
    inspect
} = require('util');
const config = require('../../config/config.json');
const fs = require('fs')

module.exports = {
    name: "eval",
    description: "",
    usage: "",
    aliases: [],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const code = args.join(" ");
        if (!code) return message.channel.send("Please provide some code to evaluate!");
        try {
            const evaled = eval(code);
            if (typeof evaled !== "string")
                evaled = inspect(evaled);
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Evaluation")
                .setDescription(`\`\`\`js\n${evaled}\`\`\``)
                .setFooter(`Evaluated by ${message.author.tag}`);
            message.channel.send({embeds: [embed]});
        }
        catch (err) {
            const msg = err.message.toString();
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Evaluation")
                .setDescription(`\`\`\`js\n${msg}\`\`\``)
                .setFooter(`Evaluated by ${message.author.tag}`);
            message.channel.send({embeds: [embed]});
        }
    }
};
