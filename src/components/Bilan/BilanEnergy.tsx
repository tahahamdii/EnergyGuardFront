import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import BilanChart from "./BilanChart";
import BilanTab from "./BilanTab";


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
