const Maintenance = require('../../models/maintenance.js')
const mongoose = require('mongoose');

module.exports = {
  name: 'maintenance', //This is for the Name of the command
  usage: "maintenance <enable/disable> <reason>", //This lets the user Know how to use the command
  description: 'This is to Put the bot into or out of maintenance mode', //Gives a easy description
  category: "Owner", // What category the command should be in
  aliases: "mm", // Lets people use the command different way IE ping becomes p
  cooldown: 0, // The cooldown for the command
  ownerOnly: false, // If the command can only be used by the Owner
  hidden: true, // If you want the command to be hidden
  disabledbug: false, // If the command has been has been disabled due to a bug
  disabled: false, // If the command is still being Made
  perms: [], // The perms the user needs
  botperms: [], // The perms the bot needs
  darkinkonly: true, // If its only for DarkerInk
  notneeded: true,
  run: async (client, message, args, data) => {
    if (!args[0]) return message.channel.send('Would you like to enable or disable maintenance mode?')

    const maintenance = await Maintenance.findOne({
      maintenance: 'maintenance'
    })
    let reason2 = args.slice(1).join(" ")
    if (args[0].toLowerCase() == "enable") {
      if (maintenance) {
        if (!reason2) return message.channel.send('You need to add a reason')
        maintenance.toggle = "true"
        maintenance.reason = `${reason2}`
        await maintenance.save();

      } else {
        const newMain = new Maintenance({
          toggle: "false",
          reason: ""
        })
        newMain.save().catch(() => {})
      }
      await message.channel.send(`You enabled maintenance Mode because of \`${reason2}\``)

    } else if (args[0].toLowerCase() == "disable") {

      if (maintenance) {
        maintenance.toggle = "false"
        await maintenance.save();

      } else {
        const newMain = new Maintenance({
          toggle: "false",
          reason: ""
        })
        newMain.save().catch(() => {})
      }
      await message.channel.send('Disabling maintenance Mode')

    } else {
      message.channel.send('Invalid Response')
    }

  }
}
