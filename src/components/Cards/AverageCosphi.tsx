import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsomGlo from './ConsomGlo';
import FlashOnIcon from '@mui/icons-material/FlashOn'; // Import the FlashOnIcon

const AverageCosphi = () => {
    const [overallTotalCosphi, setOverallTotalCosphi] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/energieUsine/calculateOverallTotalCosphi';
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
                    setOverallTotalCosphi(responseData.overallTotalCosphi);
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
            
              title="Average Cosphi "
              total={`${overallTotalCosphi ?? 'Loading...'} kWh`}
              rate=""
              levelUp
              icon={<FlashOnIcon />} 
            />
        </div>
    );
};

export default AverageCosphi;
