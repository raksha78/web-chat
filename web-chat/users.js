const sessions = require('./sessions');

const messages = [];

function isValidUsername(username) {
    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
        console.log("Invalid username");
        return false;
    }
    return true;
}

function message({ message, username, sid }) {
    let image = sessions.image(sid);
    messages.push({ message, username, image });
}

function getAllMessages() {
    return messages;
}

module.exports = {
    isValidUsername, message, getAllMessages
};