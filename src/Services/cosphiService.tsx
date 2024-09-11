import axios from 'axios';
import baseUrl from "../enviroment/enviroment"

const predictCosphi = async (date: string, heure: string) => {
  try {
    const response = await axios.get(`${baseUrl.baseUrl}/cosphi/predictCosphi`, {
      params: { date, heure }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};


const getAllPredictions = async () => {
  try {
    const response = await axios.get(`${baseUrl.baseUrl}/cosphi/getAllPredictions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all predictions:', error);
    throw error;
  }
};

export { predictCosphi, getAllPredictions };