import { BASE_URL } from '../config';

export async function userLogin({ username, password}){
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error("login failed");
    }

    return data;
}

export async function getEverything(username){
    const response = await fetch(`${BASE_URL}/user-data/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error("failed getting user data");
    }

    return data;
}

