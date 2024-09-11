import React, { useEffect, useState } from 'react';
import ConsomGlo from './ConsomGlo';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import back from '../../images/logo/Card.PNG.jpg';
import baseUrl from "../../enviroment/enviroment"

const TotalConsom = () => {
    const [overallTotalConsumption, setOverallTotalConsumption] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/energieUsine/calculateOverallTotalConsumption`;
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
        <div style={{ color: 'white' }}>
            <ConsomGlo
                title={<span style={{ color: 'teal' , fontWeight: 'bold' }}>{"Total Energy Consumption"}</span>}
                total={<span style={{ color: 'white' }}>{`${overallTotalConsumption ?? 'Loading...'} kWh`}</span>}
                rate=""
                levelUp
                icon={<BatteryChargingFullIcon className="text-white-500 mr-3" />}
                backgroundImage={back} />
        </div>
    );
};

export default TotalConsom;
