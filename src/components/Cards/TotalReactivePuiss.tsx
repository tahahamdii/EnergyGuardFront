import React, { useEffect, useState } from 'react';
import ConsomGlo from './ConsomGlo';
import FlashOnIcon from '@mui/icons-material/FlashOn'; // Import the FlashOnIcon

const TotalReactivePuiss = () => {
    const [overallTotalReactiveConsumption, setOverallTotalReactiveConsumption] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/energieUsine/calculateOverallTotalReactiveEnergy';
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*', 
                    },
                });
                if (!response.ok) {
                    throw new Error('something is wrong');
                } else {
                    const responseData = await response.json();
                    console.log(responseData); 
                    setOverallTotalReactiveConsumption(responseData.overallTotalReactiveConsumption);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <ConsomGlo
                title="Total Reactive Energy Consumption"
             
                total={`${overallTotalReactiveConsumption ?? 'Loading...'} kWh`}          
                rate=""
                levelUp
                icon={<FlashOnIcon  className="text-blue-500 mr-3"/>} 
            />
        </div>
    );
    
};

export default TotalReactivePuiss;
