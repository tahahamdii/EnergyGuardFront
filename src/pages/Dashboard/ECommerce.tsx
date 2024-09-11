import React from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import TotalConsom from '../../components/Cards/TotalConsom';
import AverageCosphi from '../../components/Cards/AverageCosphi';
import TotalReactivePuiss from '../../components/Cards/TotalReactivePuiss';
import ConsomPerUsine from '../../components/Charts/ConsomPerUsine';
import TauxDeCharge from '../../components/Cards/TauxCharge';
import PuissApparenteGlo from '../../components/Cards/PuissApparenteGlo';
import PuissActiveGlo from '../../components/Cards/PuissActiveGlo';
import PuissanceBar from '../../components/Charts/PuissanceBar';
import CosphiPerUsine from '../../components/Cards/CosphiPerUsine';
import TauxChargeBar from '../../components/Charts/TauxChargeBar';


const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        <TotalConsom />
        <AverageCosphi />
        <TauxDeCharge />
        <PuissApparenteGlo />

      </div>


      <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="md:col-span-1 xl:col-span-1 2xl:col-span-1">
          <TotalReactivePuiss />
          <div className='mt-4'>
            <PuissanceBar />
          </div>


        </div>
        <div className="md:col-span-1 xl:col-span-2 2xl:col-span-2">
          <ConsomPerUsine />


          <div style={{ marginTop: "5px" }}>
            <CosphiPerUsine />
          </div>
        </div>

        <div className="md:col-span-1 xl:col-span-1 2xl:col-span-1">
          <PuissActiveGlo />
          <div className='mt-4'>
            <TauxChargeBar />
          </div>


        </div>
      </div>


    </DefaultLayout>
  );
};

export default ECommerce;
