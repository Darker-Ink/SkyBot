const {client} = require('../index.js');

client.distube.on("error", (message, err) =>
console.log(`${client.emotes.error} | An error encountered: ${err.stack}`)
)