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
import 'react-toastify/dist/ReactToastify.css';
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
import EmailVerify from './pages/verifyEmail/verifyEmail';
import ExampleWithLocalizationProvider from './pages/Authentication/UserManagment';
import ResetPassword from './pages/Authentication/ResetPassword';
import ForgotPassword from './pages/Authentication/ForgetPassword';
import HierarchyUsine from './components/HierarchyFactory/HierarchyUsine';
import Tree from './components/HierarchyFactory/Tree';
import ChangePassword from './pages/ChangePassword';
import EditFacture from './pages/facture/EditFact';
import FactureComponent from './pages/facture/ListFactures';
import AddFactureStepper from './pages/facture/AddFacture';
import FileInput from './pages/facture/FileInput';
import ListCosts from './pages/Cost/ListCost';
import AddCost from './pages/Cost/AddCost';
import EditCost from './pages/Cost/EditCost';
import Solar from './components/solar/solar';
import PredictionPage from './pages/facture/PredictionConsumption';
import Predict from './components/CasphiPred/PredictionCos';
import PredictAll from './components/CasphiPred/PredChart';

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
        {token == null ? (
          <>
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

            <Route
              path="/verifyEmail/:id"
              element={
                <>
                  <PageTitle title="Email verification" />
                  <EmailVerify />
                </>
              }
            />
            <Route
              path="/auth/forgetPass"
              element={
                <>
                  <PageTitle title="Forget Password" />
                  <ForgotPassword />
                </>
              }
            />
            <Route
              path="/auth/reset-password/:id"
              element={
                <>
                  <PageTitle title="Reset Password" />
                  <ResetPassword />
                </>
              }
            />



          </>





        ) : (
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
              path="/userManagment"
              element={
                <>
                  <PageTitle title="User managment" />
                  <ExampleWithLocalizationProvider />
                </>
              }
            />
            <Route
              path="/solardata"
              element={
                <>
                  <PageTitle title="Solar data"/>
                  <Solar/>
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
              path="/factures"
              element={
                <>
                  <PageTitle title="Facture Component" />
                  <FactureComponent />
                </>
              }
            />
            <Route
              path="/facture/predictConsumption"
              element={
                <>
                  <PageTitle title="Predict consumption" />
                  <PredictionPage />
                </>
              }
            />

            <Route
              path="/facture/edit/:facture_id"
              element={
                <>
                  <PageTitle title="Facture Component" />
                  <EditFacture />
                </>
              }
            />

            <Route
              path="/facture/addFacture"
              element={
                <>
                  <PageTitle title="Facture Component" />
                  <AddFactureStepper />
                </>
              }
            />


            <Route
              path="/facture/file/:facture_id"
              element={
                <>
                  <PageTitle title="FactureFile Component" />
                  <FileInput />
                </>
              }
            />

            <Route
              path="/tree"
              element={
                <>
                  <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <HierarchyUsine />
                </>
              }
            />
               <Route
              path="/predict"
              element={
                <>
                  <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Predict />
                </>
              }
            />
              <Route
              path="/getallPred"
              element={
                <>
                  <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <PredictAll />
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
              path="/costs/listCosts"
              element={
                <>
                  <PageTitle title="List Cost" />
                  <ListCosts />
                </>
              }
            />
            <Route
              path="/costs/add"
              element={
                <>
                  <PageTitle title="Cost add" />
                  <AddCost  />
                </>
              }
            />
            <Route
              path="/cost/editCost/:id"
              element={
                <>
                  <PageTitle title="Edit Cost" />
                  <EditCost />
                </>
              }
            />
            
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
                  <AddUsine />
                </>
              }
            />
            <Route
              path="/usines/editUsine/:usineId"
              element={
                <>
                  <PageTitle title="Edit Usines" />
                  <EditUsine />
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
                  <AddZone />
                </>
              }
            />
            <Route
              path="/zones/editZone/:zoneId"
              element={
                <>
                  <PageTitle title="Edit Zones" />
                  <EditZone />
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
              path="/ChangePassword"
              element={
                <>
                  <PageTitle title="Change password" />
                  <ChangePassword />
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
              path="/treeee/:usineID"
              element={
                <>
                  <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tree usineId="YourUsineIdHere" />
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
