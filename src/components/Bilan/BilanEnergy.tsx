import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import BilanChart from "./BilanChart";
import BilanTab from "./BilanTab";
import StatTable from "./StatTable";



const BilanEnergy = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="BilanEnergy" />


      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <BilanTab />
        <BilanChart />
      </div>

    </DefaultLayout>
  );
};

export default BilanEnergy;
