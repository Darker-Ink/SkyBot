const {joinVoiceChannel} = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: "Joins The Voice Channel",
    usage: "?join",
    aliases: ['summon'],
    category: "Music",
    run: async (client, message, args) => {

        async function connectToChannel(channel) {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            })
        };
        const channel = message.member?.voice.channel
        if (channel) {

            if (channel.type == 'stage') {
                const connection = await connectToChannel(channel)
                await message.reply('Joined The VC');
            } else {
                const connection = await connectToChannel(channel)
                connection.guild.me.voice.setDeaf(true);
                await message.reply('Joined The VC');
            }
        } else {
            await message.reply('Join a voice channel then try again!');
        }
    }
}