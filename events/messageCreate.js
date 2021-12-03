const Discord = require('discord.js');
const Guild = require('../schema.js')
const mongoose = require('mongoose');
const config = require('../config/config.json')
const Maintenance = require('../models/maintenance.js')
const { entersState, VoiceConnectionStatus, joinVoiceChannel, } = require('@discordjs/voice');
module.exports = {
    type: 'messageCreate',
    run: async (client, message) => {
        try {
            if (!message.content.startsWith(prefix)) return;
            if(message.author.bot) return
            let guildDB = await client.data.getGuildDB(message.guild.id)
            let msgDB = await client.data.getMsgDB(message.guild.id)
            if (message.channel.type === "text" && !message.guild.me.permissions.has("SEND_MESSAGES")) return;

            const settings = await Guild.findOne({
                guildID: message.guild.id
            })
            const prefix = settings.prefix;
            
            global.errorMessage = `oh No You got a error, Please report this command by doing ${settings.prefix}report-command <command_name> <reason_for_report>`


            if (!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

            global.command = client.commands.get(cmd);

            try {
                if (!command) command = client.commands.find((command) => command.aliases && command.aliases.includes(cmd));
                if (!command) return;
                const maintenance = await Maintenance.findOne({
                maintenance: "maintenance"
                })
                global.errorcommand = command//.replace(settings.prefix, "")           
                global.errorMessage = `oh No You got a error, Please report this command by doing \`${settings.prefix}report-command ${errorcommand.name} <reason_for_report>\``
                if(maintenance && !command.notneeded && maintenance.toggle == "true") {
                    const embed = new Discord.MessageEmbed()
                   .setTitle('In Maintenance Mode')
                   .setDescription('Maintenance Mode Is enabled')
                   .addField('reason', `${maintenance.reason}`)
                   .setColor('GREEN')
                   .setTimestamp()
                  return message.channel.send({ embeds: [embed] })
                   }
                if (command.ownerOnly && !config.owners.includes(message.author.id)) {
                    return
                }
                if (!message.member.permissions.has(command.perms)) {
                    message.channel.send(`You do Not have the right perms to use this command You need \`\`${command.perms.join(", ")}\`\` To use this command!`, command.perms)
                    return;
                }
                if (!message.guild.me.permissions.has(command.botperms)) {
                    const mIm = (`${command.perms}`)
                    message.channel.send(`I am **Missing Perms** Please Add these: \`\`${command.botperms.join(", ")}\`\``, command.botperms)
                    return;
                }
                const {
                    cooldowns
                } = client;

                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Discord.Collection());
                }

                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = (command.cooldown || 3) * 1000;

                if (timestamps.has(message.author.id)) {
                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                    if (now < expirationTime) {
                        const timeLeft = (expirationTime - now) / 1000;
                        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                    }
                }

                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            } catch (err) {
                console.log(err)
            }
            if (command) {
                command.run(client, message, args);
            }
                
        } catch (err) {
            console.log(err)
        }
    }
}
