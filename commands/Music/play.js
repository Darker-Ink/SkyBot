module.exports = {
    name: "play",
    description: "Plays Songs <3",
    usage: "?play <Song Name / URL>",
    aliases: ["p"],
    category: "Music",
    run: async (client, message, args) => {
        const song = args.join(" ");
        if(!song) return message.channel.send("Please provide a song name or url");
        if(!message.guild.me.voice)
        client.commands.get("join").run(client, message);
        client.distube.play(message, song)
    }
}