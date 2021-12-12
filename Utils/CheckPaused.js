let CheckPaused = async (client, message) => {
	const queue = client.distube.getQueue(message);
    
	if(queue.paused) {
        return true
    }
    return false
}

module.exports.CheckPaused = CheckPaused;