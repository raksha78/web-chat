export function fetchSession(){
    return fetch('/api/v1/session')
    .catch( () => Promise.reject({ error: 'networkError' }))
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}

export function fetchLogin(username){
    return fetch('/api/v1/session', {
        method: "POST",
        body: JSON.stringify( { username }),
        headers: new Headers({
            'content-type': 'application/json',
        })
    })
    .catch( () => Promise.reject({ error: 'networkError'}))
    .then( response => {
        if (response.ok) {
            return response.json();
          }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    })
}

export function fetchLogout(){
    return fetch('/api/v1/session', {
        method: "DELETE",
        headers: new Headers({
            'content-type': 'application/json',
        })
    })
    .catch( () => Promise.reject( { error: "networkError"} ))
    .then( response => {
        if(response.ok){
            return response.json()
        }

        return response.json()
        .catch( error => Promise.reject({error}))
        .then( err => Promise.reject(err))
    })
}

export function fetchMessage(message){
    return fetch('/api/v1/message', {
        method: "POST",
        body: JSON.stringify({message}),
        headers: new Headers({
            'content-type': 'application/json',
        })
    })
    .catch( () => Promise.reject( { error: "networkError"} ))
    .then( response => {
        if(response.ok){
            return response.json()
        }

        return response.json()
        .catch( error => Promise.reject({error}))
        .then( err => Promise.reject(err))
    })
}

export function fetchMessageList(){
    return fetch('/api/v1/message')
    .catch( () => Promise.reject( { error: "networkError"} ))
    .then( response => {
        if(response.ok){
            return response.json()
        }

        return response.json()
        .catch( error => Promise.reject({error}))
        .then( err => Promise.reject(err))
    })
}

export function fetchUsersList(){
    return fetch('/api/v1/users')
    .catch( () => Promise.reject( { error: "networkError"} ))
    .then( response => {
        if(response.ok){
            return response.json()
        }

        return response.json()
        .catch( error => Promise.reject({error}))
        .then( err => Promise.reject(err))
    })
}