const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

const sessions = require('./sessions');
const users = require('./users');

app.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid)?.username : '';
    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json(sessions.getSessionUser(sid))
});

app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValidUsername(username)) {
        res.status(400).json({ error: 'Invalid username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addNewUserSession(username);

    res.cookie('sid', sid);
    res.json(sessions.getSessionUser(sid));

});

app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid)?.username : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({ username });
});

app.post('/api/v1/message', (req, res) => {
    const { message } = req.body;

    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid)?.username : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    users.message({ message, username, sid });

    res.json({ username });
});

app.get('/api/v1/message', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid)?.username : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const messages = users.getAllMessages();

    res.json(messages);

});

app.get('/api/v1/users', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid)?.username : '';

    if (!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const users = sessions.users();

    res.json(users);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
