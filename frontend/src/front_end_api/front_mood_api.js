import { BASE_URL } from '../config';

export async function send_mood({username, mood}){
    const response = await fetch(`${BASE_URL}/mood`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, mood}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not update mood!');
    }

    return data;
}

export async function get_mood({username}){
    const response = await fetch(`${BASE_URL}/mood/${username}`);
    
    const data = await response.json();

    if(!response.ok){
        throw new Error('could not get mood!');
    }
    return data;
}