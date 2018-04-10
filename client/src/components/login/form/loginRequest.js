import Authentication from "../../../utils/Auth.class";

export default function loginRequest(email, pass, stateReorder){
    return fetch('http://localhost:8080/auth', {
        body: JSON.stringify({email: email, password: pass}),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer'
    }).then(response => {return response.json()})
    .then(json => {
        if(json.success && json.token !== false){
            Authentication.authenticate(json.token);
            stateReorder(json.user.name);
        }
    })
        .catch(err => console.error(err))
}

