import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ListMachines from './pages/Machines/ListMachines';
import AddMachine from './pages/Machines/AddMachine';
import EditMachine from './pages/Machines/EditMachine';
import ListUser from './pages/Users/ListUser';
import ListSensor from './pages/Sensors/ListSensor';
import AddSensor from './pages/Sensors/AddSensor';
import ListUsines from './pages/Usines/ListUsine';
import AddUsine from './pages/Usines/AddUsine';
import EditUsine from './pages/Usines/EditUsine';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file for react-toastify
import ListZones from './pages/Zones/ListZone';
import AddZone from './pages/Zones/AddZone';
import EditZone from './pages/Zones/EditZone';
import ListTgbt from './pages/tgbt/ListTgbt';
import AddTgbt from './pages/tgbt/AddTgbt';
import ListSaison from './pages/Saison/ListSaison';
import AddSaison from './pages/Saison/AddSaison';
import EditSaison from './pages/Saison/EditSaison';
import EditTgbt from './pages/tgbt/EditTgbt';
import BilanEnergy from './components/Bilan/BilanEnergy';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {token==null?(
          <>
          <Route
          index
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
          </>
        ):(
          <>
          <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/machines/listMachines"
          element={
            <>
              <PageTitle title="List Machines" />
              <ListMachines />
            </>
          }
        />
       
         <Route
          path="/machines/addMachine"
          element={
            <>
              <PageTitle title="Add Machine" />
              <AddMachine />
            </>
          }
        />
          
        <Route>
        <Route path="/machines/editMachine/:machineId" 
        element={
          <EditMachine />
          } />
        </Route>
        <Route
          path="/sensors/listSensor"
          element={
            <>
              <PageTitle title="List Sensors" />
              <ListSensor />
            </>
          }
        />
         <Route
          path="/sensors/addSensor"
          element={
            <>
              <PageTitle title="Add Sensors" />
              <AddSensor />
            </>
          }
        />
         <Route
          path="/users"
          element={
            <>
              <PageTitle title="List Users" />
              <ListUser />
            </>
          }
        />
         <Route
          path="/usines/listUsines"
          element={
            <>
              <PageTitle title="List Usines" />
              <ListUsines />
            </>
          }
        />
        <Route
          path="/usines/addUsine"
          element={
            <>
              <PageTitle title="Add Usines" />
              <AddUsine/>
            </>
          }
        />
            <Route
          path="/usines/editUsine/:usineId"
          element={
            <>
              <PageTitle title="Edit Usines" />
              <EditUsine/>
            </>
          }
        />
         <Route
          path="/zones/listZones"
          element={
            <>
              <PageTitle title="List Zone" />
              <ListZones />
            </>
          }
        />
        <Route
          path="/zones/addZone"
          element={
            <>
              <PageTitle title="Add Zone" />
              <AddZone/>
            </>
          }
        />
            <Route
          path="/zones/editZone/:zoneId"
          element={
            <>
              <PageTitle title="Edit Zones" />
              <EditZone/>
            </>
          }
        />
            <Route
          path="/saison/listSaison"
          element={
            <>
              <PageTitle title="List Saison" />
              <ListSaison />
            </>
          }
        />
        
        <Route
          path="/saison/addSaison"
          element={
            <>
              <PageTitle title="Add Saison" />
              <AddSaison />
            </>
          }
        />
          <Route
          path="/saison/updateSaison/:saisonId"
          element={
            <>
              <PageTitle title="Edit Saison" />
              <EditSaison />
            </>
          }
        />
        <Route
          path="/tgbt/listTgbt"
          element={
            <>
              <PageTitle title="List TGBT" />
              <ListTgbt />
            </>
          }
        />
        <Route
          path="/tgbt/addTgbt"
          element={
            <>
              <PageTitle title="Add TGBT" />
              <AddTgbt />
            </>
          }
        />
         <Route
          path="/tgbt/updateTGBT/:tgbtId"
          element={
            <>
              <PageTitle title="Edit TGBT" />
              <EditTgbt />
            </>
          }
        />
          
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
          <Route
          path="/bilan"
          element={
            <>
                          <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />

              <BilanEnergy />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
          </>
        )
      
      }
      </Routes>
    </>
  );
}

export default App;
