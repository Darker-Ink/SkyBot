const {client} = require('../index.js');

client.distube.on("error", (message, err) => console.log(`[${message}] ${err}`));