import React, { useState } from 'react';
import axios from 'axios';

const CarbonFootprintCalculator = () => {
    const [shipmentWeight, setShipmentWeight] = useState('');
    const [distance, setDistance] = useState('');
    const [carbonFootprint, setCarbonFootprint] = useState(null);

    const calculateCarbonFootprint = async () => {
        try {
            const response = await axios.post(
                'https://www.carboninterface.com/api/v1/estimates',
                {
                    type: 'shipping',
                    weight_value: shipmentWeight,
                    weight_unit: 'kg',
                    distance_value: distance,
                    distance_unit: 'km',
                    mode: 'truck',
                },
                {
                    headers: {
                        Authorization: 'Bearer B4htKTlYk7fs6dgGVpamsQ',
                    },
                }
            );
            console.log('API Response:', response.data); // Log the response data
            setCarbonFootprint(response.data.data.attributes.carbon_g);
        } catch (error) {
            console.error('Error calculating carbon footprint:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Carbon Footprint Calculator</h2>
            <div className="mb-4">
                <label className="block mb-2">Shipment Weight (kg):</label>
                <input
                    type="number"
                    value={shipmentWeight}
                    onChange={(e) => setShipmentWeight(e.target.value)}
                    placeholder="Enter shipment weight"
                    className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-primary appearance-none"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Distance (km):</label>
                <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Enter distance"
                    className="w-full px-4 py-2 rounded border-gray-300 focus:outline-none focus:border-primary appearance-none"
                />
            </div>
            <button
                onClick={calculateCarbonFootprint}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark focus:outline-none focus:bg-primary-dark"
            >
                Calculate
            </button>
            {carbonFootprint && (
                <p className="mt-4 font-bold" style={{ fontSize: '16px' , color:'red'}}>Estimated Value: {carbonFootprint} grams CO2</p>
            )}
        </div>
    );
};

export default CarbonFootprintCalculator;
