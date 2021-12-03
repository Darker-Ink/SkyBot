const {
    MessageEmbed
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const mongoose = require('mongoose');
const Guild = require('../../schema.js')
const dir = path.join(__dirname, "../");
module.exports = {
    name: "help",
    aliases: [''],
    description: "Shows all available bot commands.",
    disabled: false,
    run: async (client, message, args) => {
    const commands = getFiles(dir);
    console.log(commands);
    }}


    function getFiles(directory) {
        fs.readdirSync(directory).forEach(file => {
            const Absolute = path.join(directory, file);
            if (fs.statSync(Absolute).isDirectory()) return getFiles(Absolute);
            else return files.push(Absolute);
        });
    }