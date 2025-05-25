

export async function setSymptoms(username, symptoms){
    const response = await fetch(`/symptoms`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({username, symptoms}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not set symptom!');
    }
    return data;
}

export async function getSymptoms(username){
    const response = await fetch(`/symptoms/${username}`);

    const data = await response.json();

    if(!response.ok){
        throw new Error('could not get symptoms!');
    }
    return data;
}