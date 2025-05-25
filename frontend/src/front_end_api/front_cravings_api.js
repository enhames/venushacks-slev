import { BASE_URL } from '../config';

export async function setCravings(username, cravings){
    const response = await fetch(`${BASE_URL}/cravings`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({username, cravings}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not set craving!');
    }
    return data;
}

export async function getCravings(username){
    const response = await fetch(`${BASE_URL}/cravings?username=${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not get craving!');
    }
    return data;
}