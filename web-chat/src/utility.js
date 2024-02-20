let currentState = '';
let app = '';

export default function loader({ state, appEle }) {
    currentState = state;
    app = appEle;

    if (currentState.isLoadingMessageData && currentState.isLoggedIn) {
        addsMessageLoader();
    }
    if (currentState.isLoadingUserData && currentState.isLoggedIn) {
        addsUserLoader();
    }
}

function addsMessageLoader() {
    const loaderEle = document.querySelector('.chat__message');
    const html = `<span>Loading Data</span>`

    loaderEle.innerHTML = html;
}

function addsUserLoader() {
    const loaderEle = document.querySelector('.usersList');
    const html = `<span>Loading Data</span>`

    loaderEle.innerHTML = html;
}

export function addsMessages(state) {
    const messageEle = document.querySelector('.chat__message');
    const newMessages = state.messages;
    const messageItems = newMessages.map(item => `<li><div class="message"><div class="profile"><img class="user-profile__avatar" src=${item.image} alt="user photo"/><span>${item.username}</span></div><span class="text">${item.message}</span></div></li>`).join('') || `<p>No messages to show</p>`;
    messageEle.innerHTML = messageItems;
    return;
}

export function addsUsers(state) {
    const usersEle = document.querySelector('.usersList');
    let users = state.users;
    users = users.filter(item => item.username !== state.username);
    const usersItems = users.map(item => `<li><div class="user-profile"><img class="user-profile__avatar" src="${item.image}" alt="user photo"/><span>${item.username}</span></div></li>`).join(' ');
    usersEle.innerHTML = usersItems;
    return;
}