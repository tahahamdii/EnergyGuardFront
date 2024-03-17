import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsomGlo from './ConsomGlo';
import FlashOnIcon from '@mui/icons-material/FlashOn'; // Import the FlashOnIcon

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

    // Custom icon for total energy consumption card
    const totalEnergyIcon = (
      <svg
        className="fill-custom-color" // Add your custom class for styling
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Add your custom SVG path here */}
      </svg>
    );

    return (
        <div>
            <ConsomGlo
            
              title="Total Energy Consumption"
              total={`${overallTotalConsumption ?? 'Loading...'} kWh`}
              rate=""
              levelUp
              icon={<FlashOnIcon />} 
            />
        </div>
    );
};

export default TotalConsom;
