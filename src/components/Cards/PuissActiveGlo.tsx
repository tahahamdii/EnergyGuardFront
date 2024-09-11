import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsomGlo from './ConsomGlo';
import back from '../../images/logo/Cap3.jpg'

import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';

const PuissActiveGlo = () => {
    

    return (
        <div>
           <ConsomGlo
              title="Overall active power              "
              total="3 562.99 Kva" 
              rate=""
              levelUp
              icon={<PowerSettingsNewOutlinedIcon />}
              backgroundImage={back} />
        </div>
    );
};

export default PuissActiveGlo;
