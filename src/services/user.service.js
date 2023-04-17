import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';

import { fetchWrapper } from '@/helpers';

const apiURL = "http://localhost:3000";
const tokenSubject = new BehaviorSubject(typeof window !== 'undefined' && localStorage.getItem('token'));

export const userService = {
    token: tokenSubject.asObservable(),
    get tokenValue () { return tokenSubject.value },
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    return fetchWrapper.post(`${apiURL}/auth/login`, { username, password })
        .then( data => {
            // sessionStorage.setItem("token", token); //Create a check keep me logged in
            localStorage.setItem("token", data.access_token);
            console.log("localStorage", localStorage.getItem('token'));

            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            tokenSubject.next(data.access_token);
            return data;
        });
}

function logout() {
    tokenSubject.next(null)
    localStorage.removeItem('token');
    return fetchWrapper.post(`${apiURL}/auth/logout`)
    .then(data =>  {
        Router.push('/account/login');
    });
}

function register(user) {
    return fetchWrapper.post(`${apiURL}/auth/signup`, user);
}

function getAll() {
    return fetchWrapper.get(apiURL);
}

function getById(id) {
    return fetchWrapper.get(`${apiURL}/${id}`);
}

function update(id, params) {
    return fetchWrapper.put(`${apiURL}/${id}`, params)
        .then(x => {
            // update stored user if the logged in user updated their own record
            // if (id === userSubject.value.id) {
            //     // update local storage
            //     const user = { ...userSubject.value, ...params };

            //     // publish updated user to subscribers
            //     userSubject.next(user);
            // }
            // return x;
        });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${apiURL}/auth/delete${id}`);
}
