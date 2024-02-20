import { MESSAGES } from "./constants";

const state = {
    'isLoggedIn': false,
    'isLoadingMessageData': false,
    'isLoadingUserData': false,
    'error': '',
    'username': '',
    'userimage': '',
    'messages': [],
    'users': [],
    'userIntervalId': '',
    'messageIntervalId': ''
}

export function login({ username, image }) {
    state['isLoggedIn'] = true;
    state['username'] = username;
    state['userimage'] = image;
}

export function logout() {
    state['isLoggedIn'] = false;
    state['username'] = '';
}

export function recentMessages(messages) {
    state['messages'] = messages;
}

export function currentUsers(users) {
    state['users'] = users;
}

export function addMessageLoader() {
    state['isLoadingMessageData'] = true
    return;
}

export function addUserLoader() {
    state['isLoadingUserData'] = true
}

export function removeMessageLoader() {
    state['isLoadingMessageData'] = false
}

export function removeUserLoader() {
    state['isLoadingUserData'] = false
}


export function messageIntervalId(id) {
    state['messageIntervalId'] = id
}

export function userIntervalId(id) {
    state['userIntervalId'] = id
}

export function intervals() {
    let intervalsList = [];
    intervalsList.push(state['messageIntervalId']);
    intervalsList.push(state['userIntervalId']);

    return intervalsList;

}

export function clearInterval() {
    state['messageIntervalId'] = '';
    state['userIntervalId'] = '';

}

export function setError(error) {
    if (!error) {
        state.error = '';
        return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;