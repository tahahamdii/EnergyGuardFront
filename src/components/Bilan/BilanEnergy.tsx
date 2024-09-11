import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import BilanBar from "./BilanBar";
import BilanChart from "./BilanChart";
import BilanTab from "./BilanTab";
import EnergyPerUsagePie from "./EnergyPerUsagePie";
import EnergyTab from "./EnergyTab";




const BilanEnergy = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="BilanEnergy" />

    
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <BilanTab />
        <BilanChart />
        <EnergyTab />
        <BilanBar />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
          <div >
            <EnergyPerUsagePie />
          </div>
          <div>
            <EnergyPerUsagePie />
          </div>
        </div>


      </div>

    </DefaultLayout>
  );
};

export default BilanEnergy;
