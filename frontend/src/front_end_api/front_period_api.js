import { BASE_URL } from '../config';

export async function updatePeriod(username, period){
    const response = await fetch(`${BASE_URL}/period`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({username, period}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error("period update failed");
    }

    return data;
}

export async function getRecentPeriod(username){
    const response = await fetch(`${BASE_URL}/last-period/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error("failed to get the most recent period");
    }

    return data;
}