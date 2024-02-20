const uuid = require('uuid').v4;

const session = {}

function getSessionUser(sid) {
    if (session[sid]) {
        return session[sid];
    }
}

function addNewUserSession(username) {
    const sid = uuid();

    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const image = `images/memoji-${randomNumber}.png`

    session[sid] = {
        username,
        image
    };

    return sid;
}

function deleteSession(sid) {
    delete session[sid];
}

function users() {
    let users = [];

    const keys = Object.keys(session)

    keys.forEach(item => {
        if (session[item]['username']) {
            let username = session[item]['username'];
            let image = session[item]['image'];
            if (!users.includes(username)) {
                users.push({ username, image });
            }
        }
    });

    return users;
}

function image(sid) {
    return session[sid]['image']
}

module.exports = { getSessionUser, addNewUserSession, deleteSession, users, image };

