import React, { useEffect, useState } from 'react';
import ConsomGlo from './ConsomGlo';
import FlashOnIcon from '@mui/icons-material/FlashOn';

const TotalReactivePuiss = () => {
    const [overallTotalReactiveEnergy, setOverallTotalReactiveEnergy] = useState<number | null>(null);

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
                    setOverallTotalReactiveEnergy(responseData.overallTotalReactiveEnergy);
                    console.log(responseData.overallTotalReactiveEnergy);
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
                title="Reactive Energy Consumption"
                total={`${overallTotalReactiveEnergy ?? 'Loading...'} kWh`}          
                rate=""
                levelUp
                icon={<FlashOnIcon  className="text-blue-500 mr-3"/>} 
            />
        </div>
    );
    
};

export default TotalReactivePuiss;
