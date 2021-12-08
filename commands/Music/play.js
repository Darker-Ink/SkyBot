const { MessageEmbed } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "play",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["p"],
    category: "Music",
    run: async (client, message, args) => {
        const song = args.join(" ");
        const channel  = message.member?.voice.channel;
        if (!channel) return message.channel.send("You must be in a voice channel to play music!");
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        })
        client.distube.play(message, song)
    }
}