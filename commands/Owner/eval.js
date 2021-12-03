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
        if (!code) return message.channel.send('Well. What the fuck do you want me to eval? Do i need to teach you how to use eval? Try doing this since you don\'t know how to use the eval command \`?eval message.channel.send(\'hi\')\` BOOM there')
        if (!config.darkink.includes(message.author.id)) return
        try {
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            const embed = new MessageEmbed()
                .setTitle('Eval')
                .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
                .addField(`OutPut`, `\`\`\`js\n${evaled}\n\`\`\``)
                .setColor('GREEN')
            return message.channel.send({
                embeds: [embed]
            })
        } catch (err) {
            const erroembed = new MessageEmbed()
                .setTitle('Eval')
                .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
                .addField(`OutPut`, `\`\`\`js\n${err.stack}\n\`\`\``)
                .setColor('RED')
            return message.channel.send({
                embeds: [erroembed]
            })
        }
    }
};
