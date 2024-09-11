import React, { useState, useEffect } from 'react';
import geolocationService from '../../Services/geoService';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import an icon from MUI

const popoverContentStyle = {
    backgroundColor: '#f0f0f0',
    border: '2px solid #ccc',
    borderRadius: '10px',
    padding: '16px', // Adjust padding as needed
    maxWidth: '600px',
};

const iconStyle = {
    marginRight: '8px',
    color: '#007bff',
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
};

interface GeolocationAndTariffData {
    country: string;
    country_name: string;
    latitude: number;
    longitude: number;
    tariff: { consumptionRange: string; cost: number }[];
}

const GeolocationAndTariffComponent = () => {
    const [data, setData] = useState<GeolocationAndTariffData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await geolocationService.getGeolocationAndTariffData();
                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '10px',
    };

    const iconStyle = {
        marginRight: '8px',
        color: '#007bff',
    };

    const buttonStyle = {
        marginLeft: '8px',
    };

    return (
        <div>
            <div style={headerStyle}>
                {/* <LocationOnIcon style={iconStyle} /> */}
                {/* <h1>Geolocation and Tariff </h1> */}
                <Button
                    variant="contained"
                    onClick={handleClick}
                    style={{
                        ...buttonStyle,
                        background: 'linear-gradient(45deg, #2196F3 20%, #21CBF3 90%)',
                        borderRadius: 10,
                        border: 0,
                        color: 'white',
                        height: 45,
                        padding: '0 30px',
                        boxShadow: '0 3px 2px 2px rgba(33, 203, 243, .2)',
                        fontWeight: 'bold',
                    }}
                    startIcon={<LocationOnIcon style={{ ...iconStyle, color: 'white' }} />}
                >
                    VIEW Geolocation and Tariff
                </Button>

            </div>


            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{ style: popoverContentStyle }}
            >
                {data && (
                    <div>
                        <p>Country: {data.country}</p>
                        <p>Latitude: {data.latitude}</p>
                        <p>Longitude: {data.longitude}</p>
                        <h3>Tariff Data</h3>
                        <ul>
                            {data.tariff.map((item, index) => (
                                <li key={index}>
                                    {item.consumptionRange}: {item.cost}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Popover>
        </div>
    );
};

export default GeolocationAndTariffComponent;
