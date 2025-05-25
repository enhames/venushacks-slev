

export async function setPreferences(username, preferences){
    const response = await fetch(`/preferences`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, preferences}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not set preferences!');
    }
    return data;
}

export async function getPreferences(username){
    const response = await fetch(`/preferences/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not get preferences!');
    }
    return data;
}