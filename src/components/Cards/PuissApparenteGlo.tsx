import React, { useEffect } from 'react';
import ConsomGlo from './ConsomGlo';
import FlashOnIcon from '@mui/icons-material/FlashOn'; 
import back from '../../images/logo/Cap3.jpg';

const PuissApparenteGlo = () => {
    // Static value for "Puissance Apparente Globale"
    const puissanceApparente = "2 562.99"; // Provide your static value here

    useEffect(() => {
        // Store the static value in localStorage when the component mounts
        localStorage.setItem('puissanceApparente', puissanceApparente);
    }, []);

    return (
        <div>
            <ConsomGlo
                title="Overall apparent power"
                total={`${puissanceApparente} Kva`} 
                rate=""
                levelUp
                icon={<FlashOnIcon />}
                backgroundImage={back} />
        </div>
    );
};

export default PuissApparenteGlo;
