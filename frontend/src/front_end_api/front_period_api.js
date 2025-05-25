export async function updatePeriod(username, period){
    const response = await fetch(`/period`, {
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
    const response = await fetch(`/last-period/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error("failed to get the most recent period");
    }

    return data;
}