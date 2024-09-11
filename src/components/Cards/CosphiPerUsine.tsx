import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import baseUrl from "../../enviroment/enviroment"

const CosphiPerUsine = () => {
    const [overallTotalCosphi, setOverallTotalCosphi] = useState<number | null>(null);
    const [totalCosphiPerUsine, setTotalCosphiPerUsine] = useState<any[]>([]);

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
                    setTotalCosphiPerUsine(responseData.totalCosphiPerUsine);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Card style={{ width: '100%', backgroundSize: 'cover' }}>
            <Card.Body>
                <Card.Title style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    <AlignVerticalTopIcon style={{ marginRight: '10px', fontSize: '20px', color: 'green' }} />
                    Overall Total Cosphi
                </Card.Title>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {totalCosphiPerUsine.length > 0 && (
                        <div style={{ display: 'flex' }}>
                            {totalCosphiPerUsine.map((item, index) => (
                                <div key={index} style={{ marginRight: '20px' }}>
                                    <span style={{ marginRight: '' }}>{`${item.name} : `}</span>
                                    <span style={{ marginRight: '118px' }}>{`${item.totalCosphi}`}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CosphiPerUsine;
