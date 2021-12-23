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
    ownerOnly: true,
    run: async (client, message, args) => {
        let code = args.join(" ");
        if (!code) return message.channel.send("Please provide some code to evaluate!");
        try {
            let evaled = eval(code);
                
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Evaluation")
                .setDescription(`\`\`\`js\n${evaled}\`\`\``)
                .addField("Type", typeof evaled)
                .setFooter(`Evaluated by ${message.author.tag}`);
            message.channel.send({embeds: [embed]});
        }
        catch (err) {
            let msg = err.message.toString();
            let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Evaluation")
                .setDescription(`\`\`\`js\n${msg}\`\`\``)
                .addField("Type", typeof msg)
                .setFooter(`Evaluated by ${message.author.tag}`);
            message.channel.send({embeds: [embed]});
        }
    }
};
