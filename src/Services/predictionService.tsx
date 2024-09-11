import axios from 'axios';
import BaseUrl from '../enviroment/enviroment'


const fetchPrediction = async (year:any, month:any) => {
    const url = BaseUrl.baseUrl + `/predict/predict?year=${year}&month=${month}`;

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            console.log('Predicted Consumption:', response.data.prediction);
            return { success: true, predictedConsumption: response.data.prediction };
        } else {
            console.error('Failed to fetch predicted consumption from the server');
            return { success: false, message: 'Failed to fetch predicted consumption' };
        }
    } catch (error) {
        console.error('Error occurred while fetching predicted consumption:', error);
        return { success: false, message: error.message };
    }
};

const fetchAllPredictions = async () => {
    const url = BaseUrl.baseUrl + `/predict/predictions`; 

    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            console.log('All Predictions:', response.data.predictions);
            return { success: true, predictions: response.data.predictions };
        } else {
            console.error('Failed to fetch predictions from the server');
            return { success: false, message: 'Failed to fetch predictions' };
        }
    } catch (error) {
        console.error('Error occurred while fetching predictions:', error);
        return { success: false, message: error.message };
    }
};

const fetchCarbonEmissions = async (electricityValue:any, country:any, state:any) => {
    const url = "https://www.carboninterface.com/api/v1/estimates";
    const apiKey = "is4V1oHfI4LPyqHn9zk5ng";  
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const body = {
        type: "electricity",
        electricity_unit: "kwh",
        electricity_value: electricityValue,
        country: country,
        state: state
    };

    try {
        const response = await axios.post(url, body, { headers });
        if (response.status === 201) {
            console.log('Carbon Emissions Data:', response.data.data);
            return { success: true, emissionsData: response.data.data.attributes };
        } else {
            console.error('Failed to fetch carbon emissions data');
            return { success: false, message: 'Failed to fetch carbon emissions data' };
        }
    } catch (error) {
        console.error('Error occurred while fetching carbon emissions data:', error);
        return { success: false, message: error.message };
    }
};



export { fetchPrediction , fetchAllPredictions , fetchCarbonEmissions};
