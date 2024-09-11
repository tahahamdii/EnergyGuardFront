import React, { useEffect, useState } from 'react';
import ConsomGlo from './ConsomGlo';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import back from '../../images/logo/Cap2.jpg';
import baseUrl from "../../enviroment/enviroment"

const TotalReactivePuiss = () => {
    const [overallTotalReactiveEnergy, setOverallTotalReactiveEnergy] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/energieUsine/calculateOverallTotalReactiveEnergy`;
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
                    // Store the fetched data in localStorage
                    localStorage.setItem('overallTotalReactiveEnergy', JSON.stringify(responseData.overallTotalReactiveEnergy));
                    setOverallTotalReactiveEnergy(responseData.overallTotalReactiveEnergy);
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
                title={<span style={{ color: 'white' }}>{"Reactive Energy Consumption"}</span>}
                total={<span style={{ color: 'white' }}>{`${overallTotalReactiveEnergy ?? 'Loading...'} kWh`}</span>}
                rate=""
                levelUp
                icon={<PowerSettingsNewOutlinedIcon className="text-white-500 mr-3" />}
                backgroundImage={back} />
        </div>
    );
};

export default TotalReactivePuiss;
