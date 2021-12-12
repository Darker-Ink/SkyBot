let checkPlaying = async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return false
    if (!queue.songs[0]) return false

    return true

}

module.exports.checkPlaying = checkPlaying;