const config = require('../config/config.json')
const {client} = require('../index.js')
const {coolDown} = require("../cooldown")
client.on("messageCreate", async message => {
    if (message.author.bot) return;

    const prefix = config.prefix;

    if (!message.content.startsWith(prefix)) return;
    global.errorMessage = `oh No You got a error, Please report this command by doing ${prefix}report-command <command_name> <reason_for_report>`

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    global.command = client.commands.get(cmd);
    if (!command) command = client.commands.find((command) => command.aliases && command.aliases.includes(cmd));
    if (!command) return;

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

    coolDown(message, command)

    try {
        command.run(client, message, args);
    } catch (error) {
        console.error(error);
        message.channel.send(errorMessage)
    }
})