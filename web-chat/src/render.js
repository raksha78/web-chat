let currentState = '';
let app = ''

export default function render({ state, appEle }) {
    currentState = state;
    app = appEle;

    if (!currentState.isLoggedIn) {
        addsLogin();
    }
    else {
        addsChat();
    }
}

function addsLogin() {
    let errorHtml;
    if (currentState.error) {
        errorHtml = `<span class="error-message">${currentState.error}</span>`;
    }
    const html =
        `<div class="login">
            <h1 class="login__title">Swift Whisper</h1>
            <form class="login__form">
                <label class="login__label">
                    ${errorHtml || ``}
                    <span>Username:</span>
                    <input class="login__username" value="" id="username" name="username">
                </label>
                <button class="login__button" type="submit">Login</button>
            </form>
        </div>`;

    app.innerHTML = html;
}

function addsChat() {
    let errorHtml;
    if (currentState.error) {
        errorHtml = `<span class="error-message">${currentState.error}</span>`;
    }
    const messages = currentState.messages;
    const messageItems = messages.map(item => `<li><div class="message"><div class="profile"><img class="user-profile__avatar" src=${item.image} alt="user photo"/><span>${item.username}</span></div><span class="text">${item.message}</span></div></li>`).join('') || `<p>no messages yet</p>`;

    let users = currentState.users;
    users = users.filter(item => item.username !== currentState.username);
    const usersItems = users.map(item => `<li><div class="user-profile"><img class="user-profile__avatar" src="${item.image}" alt="user photo"/><span>${item.username}</span></div></li>`).join(' ');

    const messageForm = `<form class="chat__form">
                            <label class="form__label">
                                <input class="form__message" value="" id="message" name="message" required placeholder="Enter message to send">
                            </label>
                            <button class="form__button" type="submit">Send</button> 
                        </form>`;
    const logout = `<button class="logout__button">Logout</button>`
    const messageList = `<ul class="chat__message">${messageItems}${errorHtml || ``}</ul>`
    const usersList = `<ul class="usersList">${usersItems}</ul>`

    const html =
        `<div class="dashboard">
            <div class="sidebar">
                <div class="current-user">
                    <img class="current-user__avatar" src=${currentState.userimage} alt="user photo"/>
                    <h2>${currentState.username}</h2>
                </div>
                <div class="active-users">
                    <h3>Active Users</h3>
                    ${usersList}
                </div>
                <div class="logout">
                    ${logout}
                </div>
            </div>
            <div class="chat-section">
                <div class="chat-section__title">
                    <h3>INFO6250</h3>
                    <img class="user-profile__avatar" src="images/memoji-group.png" alt="group photo"/>
                </div>
                <div class="chat-section__chat">
                    ${messageList}
                    ${messageForm}
                </div>
            </div>
        </div>`;

    app.innerHTML = html;
}