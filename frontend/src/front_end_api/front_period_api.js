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

export async function checkHasPeriods(username) {
  try {
    const res = await fetch(`http://localhost:5000/has-periods?username=${(username)}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Error fetching has_periods`);
    }
    return data.has_periods;
  } catch (err) {
    console.error(err);
    throw err;
  }
}