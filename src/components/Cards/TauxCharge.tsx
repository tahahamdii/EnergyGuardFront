import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsomGlo from './ConsomGlo';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import back from '../../images/logo/Cap2.jpg'

const TauxDeCharge = () => {
    

    return (
        <div>
           <ConsomGlo
              title={<span style={{ color: 'white'  }}>{"Max charge rate"}</span>}
              total={<span style={{ color: 'white' }}>{"3 562.99 Kva"}</span>}
              rate=""
              levelUp
              icon={<AlignVerticalTopIcon className="text-white-500 mr-3" />}

              backgroundImage={back} />

        </div>
    );
};

export default TauxDeCharge;
