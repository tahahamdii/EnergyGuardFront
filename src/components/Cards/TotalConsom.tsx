import React, { useEffect, useState } from 'react';
import ConsomGlo from './ConsomGlo';
import FlashOnIcon from '@mui/icons-material/FlashOn'; 

const TotalConsom = () => {
    const [overallTotalConsumption, setOverallTotalConsumption] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/energieUsine/calculateOverallTotalConsumption';
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error('something is wrong');
                } else {
                    const responseData = await response.json();
                    setOverallTotalConsumption(responseData.overallTotalConsumption);
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
            
              title="Total Energy Consumption"
              total={`${overallTotalConsumption ?? 'Loading...'} kWh`}
              rate=""
              levelUp
              icon={<FlashOnIcon  className="text-yellow-500 mr-3"/>} 
            />
        </div>
    );
};

export default TotalConsom;
