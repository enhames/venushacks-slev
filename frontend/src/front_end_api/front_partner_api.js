import { BASE_URL } from '../config';

export async function updatePartner(username, partner_username){
    const response = await fetch(`${BASE_URL}/partner`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({username, partner_username}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not update partner');
    }

    return data;
}

export async function removePartner(username){
    const response = await fetch(`${BASE_URL}/breakup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not breakup with partner!');
    }

    return data;
}

export async function getPartner(username){
    const response = await fetch(`${BASE_URL}/partner/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error('no partner!');
    }

    return data;
}