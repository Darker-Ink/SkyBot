const {
    MessageEmbed
} = require("discord.js");
const fs = require("fs");
const mongoose = require('mongoose');
const Guild = require('../../schema.js')
const path = require("path")
const dir = path.join(__dirname, "../");
let files = []
module.exports = {
    name: "help",
    aliases: [''],
    description: "Shows all available bot commands.",
    disabled: false,
    run: async (client, message, args) => {
    getFiles(dir)
        
    console.log(files);
    }}


    function getFiles(directory) {
        fs.readdirSync(directory).forEach(file => {
            const Absolute = path.join(directory, file);
            if (fs.statSync(Absolute).isDirectory()) return getFiles(Absolute);
            else return files.push(Absolute);
        });
    }