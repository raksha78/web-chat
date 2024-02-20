
import render from "./render";
import loader, {addsMessages, addsUsers} from "./utility";
import { fetchLogin, fetchLogout, fetchMessage, fetchMessageList, fetchUsersList } from "./services";
import { login, logout, recentMessages, currentUsers, addMessageLoader, addUserLoader, setError } from "./state";
import { SERVER } from "./constants";

export function addsLoginListener( { state, appEle} ){
    appEle.addEventListener( 'submit', e => {
        if(!e.target.classList.contains('login__form')){
            return;
        }

        e.preventDefault();

        const username = document.querySelector('#username').value;
        //loader
        fetchLogin(username)
        .then( response => {
            const image = response.image;
            login({username, image});
            render( {state, appEle} );

            return fetchMessageList();
        })
        .catch( err => {
            setError(err?.error || 'ERROR'); 
            render({ state, appEle });
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
        .catch( err => {
            setError(err?.error || 'ERROR'); 
            render({ state, appEle });
            return
          })
    });
}

export function addsLogoutListener( { state, appEle }){
    appEle.addEventListener('click', e => {
        if(!e.target.classList.contains('logout__button')){
            return;
        }

        e.preventDefault();
        logout();
        fetchLogout()
        .catch( err => {
            setError(err?.error || 'ERROR'); 
            render({ state, appEle });
          })
        .then( response => {
            render( { state, appEle});
        })
    });
}

export function addsMessageSendListener( { state, appEle}){
    appEle.addEventListener('submit', e => {
        if(!e.target.classList.contains("chat__form")){
            return;
        }

        e.preventDefault();

        const message = appEle.querySelector(".form__message").value;
        appEle.querySelector(".form__message").value = '';
        fetchMessage(message)
        .catch( err => {
            if( err?.error == SERVER.AUTH_MISSING ) { 
                setError(err?.error || 'ERROR'); 
                logout(); 
                render({ state, appEle });
                return;
              }
            setError(err?.error || 'ERROR'); 
            render({ state, appEle });
          })
        .then( response => {
            return fetchMessageList();
        })
        .then( response => {
            recentMessages(response);
            render( { state, appEle} );
        })
        .catch( err => {
            if( err?.error == SERVER.AUTH_MISSING ) { 
                setError(err?.error || 'ERROR'); 
                logout(); 
                render({ state, appEle });
                return;
              }
            setError(err?.error || 'ERROR'); 
            render({ state, appEle });
          });

    });
}

export function getMessages({state, appEle}){
    const messageEl = document.querySelector('.chat__message');
    if (!messageEl) {
        return;
    }
    addMessageLoader();
    loader({state});

    fetchMessageList()
    .then( response => {
        recentMessages(response);
        addsMessages(state);
        return;
    })
    .catch( err => {
        if( err?.error == SERVER.AUTH_MISSING ) { 
            logout(); 
            render({ state, appEle });
            return;
          }
        setError(err?.error || 'ERROR'); 
        render({ state, appEle });
      });
}

export function getUsers( {state, appEle } ){
    const userEl = document.querySelector('.usersList');
    if (!userEl) {
        return;
    }
    addUserLoader();
    loader({state});
    fetchUsersList()
    .then( response => {
        currentUsers(response);
        addsUsers(state);
    })
    .catch( err => {
        setError(err?.error || 'ERROR'); 
        render({ state, appEle });
      });
}