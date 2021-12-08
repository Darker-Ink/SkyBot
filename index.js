const colors = require('colors');
const Discord = require("discord.js");
const discord = require('discord.js');
const Util = require("discord.js")
const Distube = require("distube");
const { SpotifyPlugin } = require("@distube/spotify")
const fs = require("fs");
const wait = require('util').promisify(setTimeout);
require("dotenv").config();

global.config = require('./config/config.json');

const client = new Discord.Client({allowedMentions: {parse: ['users', 'roles'], repliedUser: true}, intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]})

client.distube = new Distube.default(client, {
    searchSongs: 1,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin({emitEventsAfterFetching: true,})],
    leaveOnFinish: false,
    leaveOnStop: true,
    leaveOnEmpty: true,
    nsfw: true,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji
client.cooldowns = new Discord.Collection();
client.config = config;

const cmdsNames = []

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
    cmdsNames.push(command.name)
}

client.on('ready', async () => {
    cmdsNames.forEach(async cmd => {
        console.log(colors.green(`[${time()}] ${cmd} loaded`))
    });

    console.log(colors.green((`[${time()}] ${client.user.username} is online!`)));
})


client.login(process.env.token);

module.exports.client = client;


const distubeevents = fs.readdirSync("./distube").filter(x => x.endsWith(".js"));
const events = fs.readdirSync("./events").filter(x => x.endsWith(".js"));
distubeevents.forEach(file => {
    require(`./distube/${file}`)
});

events.forEach(file => {
    require(`./events/${file}`)
});

function time() {
    const date = require('date-and-time');
    let time = new Date();
    time = date.format(time, 'HH:mm:ss');
    time = colors.red(time);
    return time;
}