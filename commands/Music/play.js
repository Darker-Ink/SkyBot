const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "play",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["p"],
    category: "Music",
    run: async (client, message, args) => {
            async function connectToChannel(channel) {
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                })
            };
            const channel = message.member?.voice.channel;

            if (channel) {
                let songName = args.slice(0).join(" ")

                if (!songName) {
                    const playError2 = new MessageEmbed()
                        .setDescription("You Need to provide a Song name or URL!")
                        .setColor("RED")
                    return message.channel.send({
                        embeds: [playError2]
                    })
                }
                client.distube.play(message, songName)
            } else {
                message.reply('Imagine Join a VC')
            }
        
    },
};