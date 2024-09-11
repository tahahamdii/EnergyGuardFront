// geolocationService.js

import axios from 'axios';
import baseUrl from "../enviroment/enviroment"

const geolocationService = {
  getGeolocationAndTariffData: async () => {
    try {
      const { data } = await axios.get(`${baseUrl.baseUrl}/geolocation-and-tariff`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch geolocation and tariff data');
    }
  }
};

export default geolocationService;
