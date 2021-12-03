const colors = require('colors');
const date = require('date-and-time');
const now = new Date();
global.time = (colors.red(date.format(now, 'hh:mm A')))
global.Discord = require("discord.js");
global.discord = require('discord.js');
const Util = require("discord.js")
require("dotenv").config();
fetch = require("node-fetch");
const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    },
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
})
const Distube = require("distube");
const SpotifyPlugin = require("@distube/spotify")
global.config = require('./config/config.json');
client.config = config;
const event_handler = require('./event');
const Guild = require('./schema.js')
const mongoose = require('mongoose');
const suggestionModel = require('./models/suggestion');
const fs = require("fs");

//Client stuff

client.distube = new Distube.default(client, {
    searchSongs: 1,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin()],
    leaveOnFinish: false,
    leaveOnStop: true,
    //leaveOnEmpty: true,
    nsfw: true,
});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji
client.cooldowns = new Discord.Collection();

function getDirectories() {
    return fs.readdirSync("./commands").filter(function subFolders(file) {
        return fs.statSync("./commands/" + file).isDirectory();
    });
}
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
    const folderFiles = fs
        .readdirSync("./commands/" + folder)
        .filter((file) => file.endsWith(".js"));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}
for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(`./commands/${file[0]}/${file[1]}`);
    } else {
        command = require(`./commands/${file}`);
    }
    client.commands.set(command.name, command);
    console.log(colors.green(`[${time}] Command Loaded: ${command.name}`));
    //pm2stats.send(`Command Loaded: ${command.name}`)
}

//Event Handler
event_handler.performEvents(client);
/*
client.on('messageDelete', message => {
    let obj = JSON.parse(String(fs.readFileSync('./snipe.json')))

    obj[message.guild.id] = JSON.parse(JSON.stringify(message))
    fs.writeFileSync('./snipe.json', JSON.stringify(obj))
})
*/
client.on('ready', () => {
    const mongo_url = process.env.mongo_url;
    console.log(colors.green((`[${time}] ${client.user.username} is online!`)));

    mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log(colors.green((`[${time}] Connected to ${client.user.username}\'s Database`))));
})

client.login(process.env.token);

const status = (queue) => {`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off" }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``};

client.distube
    .on("playSong", (queue, song) => {
        const playSongEmbed = new Discord.MessageEmbed()
            .setTitle('Started Playing')
            .setDescription(`[${song.name}](${song.url})`)
            .addField('**Views:**', parseFloat(song.views).toLocaleString('en'))
            .addField('**Duration:**', song.formattedDuration)
            .addField('**Status:**', status(queue))
            .addField('**Requested By:**', `${song.user}`)
            .setThumbnail(song.thumbnail)
            .setColor("BLUE")
        queue.textChannel.send({
            embeds: [playSongEmbed]
        })
    })
    .on("addSong", (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )
    )
    .on("searchNoResult", (message, query) =>
        message.channel.send(`No result found for ${query}!`))
    .on("playList", (message, queue, playlist, song) =>
        message.channel.send(
            `Play \`${queue.name}\` playlist (${queue.songs.length} songs).\nRequested by: ${playlist.user}\nNow playing \`${playlist.name}\` - \`${playlist.formattedDuration}\`\n${status(queue)}`
        ))
    .on("addList", (queue, playlist) => {
        queue.textChannel.stopTyping(true)
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.emotes.success} Added Playlist`)
            .setColor("GREEN")
            .addField("PlayList Name", `\`${Util.escapeMarkdown(playlist.name)}\``)
            .addField("Amount Of Songs:", `${playlist.songs.length} Songs.`)
            .addField("Status", `${status(queue)}`)
            .setTimestamp()
        queue.textChannel.send({
            embeds: [embed]
        })
    })
    .on("error", (message, err) =>
        console.log(`${client.emotes.error} | An error encountered: ${err.stack}`)
    )
    .on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("searchResult", (message, result) => {
        let i = 0
        const searchembed = new Discord.MessageEmbed()
            .setTitle('Choose an option from below')
            .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
            .setColor("YELLOW")
            .setFooter('*Enter anything else or wait 60 seconds to cancel*')
        message.channel.send({
            embeds: [searchembed]
        }).then(m => client.setTimeout(() => {
            if (!m.deleted) m.delete()
        }, 61000))
    })
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`));




const {inspect} = require("util")
process.on('unhandledRejection', (reason, promise) => {
    console.log(`UnhandledRejection\nReason:\n\`\`\`\n${inspect(reason, { depth: 0 })}\n\`\`\` Promise:\n\`\`\`\n${inspect(promise, { depth: 0 })}\n\`\`\``, { split: true })
})
process.on('uncaughtException', (err, origin) => {
    console.log(`UncaughtException\nError:\n\`\`\`\n${inspect(err, { depth: 0 })}\n\`\`\`\nType: ${inspect(origin, { depth: 0 })}`, { split: true })
})
process.on('warning', (warn) => {
    console.log(`Warning\nWarn:\n\`\`\`\n${warn.name}\n${warn.message}\n\n${warn}\n\`\`\``, { split: true })
})