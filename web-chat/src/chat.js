import {
    fetchSession,
    fetchMessageList,
    fetchUsersList
} from './services';

import {
    addsLoginListener,
    addsLogoutListener,
    addsMessageSendListener,
    getMessages,
    getUsers,
} from './listeners';

import state, {
    login,
    recentMessages,
    currentUsers,
    logout
} from './state';

import render from './render'
import { addsMessages, addsUsers } from './utility';
import { CLIENT, SERVER } from './constants';

const appEle = document.querySelector('#app');
render({ state, appEle });

setInterval(() => {
    getMessages({ state, appEle });
    getUsers({state, appEle});
}, 5000);

addsLoginListener({ state, appEle });
addsLogoutListener({ state, appEle });
addsMessageSendListener({ state, appEle });
checkForSession();

//inital or on refresh
function checkForSession() {
    fetchSession()
        .then(session => {
            const username = session.username;
            const image = session.image;
            login({ username, image });

            render({ state, appEle });
            return fetchMessageList();
        })
        .catch(err => {
            if (err?.error === SERVER.AUTH_MISSING) {
                return Promise.reject({ error: CLIENT.NO_SESSION }) 
            }
            return Promise.reject(err); 
        })
        .then(messages => {
            recentMessages(messages);
            addsMessages(state);
            return fetchUsersList();
        })
        .then(Users => {
            currentUsers(Users);
            addsUsers(state);
            return;
        })
        .catch(err => {
            if (err?.error == CLIENT.NO_SESSION) { 
                logout(); 
                render({ state, appEle });
                return;
            }
            setError(err?.error || 'ERROR'); 
            render({ state, appEle });
        });
};
