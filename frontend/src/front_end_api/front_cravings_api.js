

export async function setCravings(username, cravings){
    const response = await fetch(`/cravings`, {
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
    const response = await fetch(`/cravings/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not get craving!');
    }
    return data;
}