import axios from 'axios';

export async function fetchData(url, headers = {}) {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}