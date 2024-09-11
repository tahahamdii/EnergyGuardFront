import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';

const brandData: BRAND[] = [
  {
    logo: 'Armoire TD',
    name: '',
    visitors: 233.5,
    revenues: '68 %',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: 'Armoire Extrusion',
    name: '',
    visitors: 222.2,
    revenues: '45 %',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: 'Armoire 01Devidoir',
    name: '',
    visitors: 22.1,
    revenues: '24,29 %',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: 'Armoire Local Technique 1' ,
    name: '',
    visitors: 111.5,
    revenues: '58 %',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: 'Armoire 01 TFE',
    name: '',
    visitors: 443.5,
    revenues: '11,5 %',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: 'Armoire 01 TFE',
    name: '',
    visitors: 563.5,
    revenues: '6,5 %',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: 'Armoire 01 Usine',
    name: '',
    visitors: 553.5,
    revenues: '26 %',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: 'Armoire 02 Usine',
    name: '',
    visitors: 1003.5,
    revenues: '60,768 %',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: 'Alimentation SOTEE',
    name: '',
    visitors: 335.5,
    revenues: '11.5 %',
    sales: 390,
    conversion: 4.2,
  },
  {
    logo: 'Total ',
    name: '',
    visitors: 31235.5,
    revenues: '6,7 %',
    sales: 6550,
    conversion: 4.2,
  },
];

const EnergyTab = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
     

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
        <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            </h5>
          </div>
        <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Energy KHW 
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Percent %
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Cost DT
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Percent %
            </h5>
          </div>
      
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
              {brand.logo}
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.revenues}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.sales} Dt</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.conversion} %</p>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyTab;
