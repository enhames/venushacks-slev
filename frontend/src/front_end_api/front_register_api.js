import { BASE_URL } from "../config";

export async function register({username, email, password, has_periods}){
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, has_periods}),
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error("registration failed");
    }

    return data;
}