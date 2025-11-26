import { fetchData } from "./fetch"

// fetch stats data
export const fetchStatsData = async () => {
    return await fetchData('/api/dash');
}