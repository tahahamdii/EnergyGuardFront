import React, { useEffect, useState } from 'react';
import ConsomGlo from './ConsomGlo';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import back from '../../images/logo/Cap3.jpg'
import baseUrl from "../../enviroment/enviroment"


const AverageCosphi = () => {
    const [overallTotalCosphi, setOverallTotalCosphi] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/energieUsine/calculateOverallTotalCosphi`;
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
              icon={<CableOutlinedIcon />}
              backgroundImage={back} />
            
        </div>
    );
};

export default AverageCosphi;
