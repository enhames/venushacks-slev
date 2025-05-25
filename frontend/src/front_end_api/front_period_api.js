import { BASE_URL } from "../config";

export async function getLastPeriod(){
    const response = await fetch(`${BASE_URL}/last-period`)
}