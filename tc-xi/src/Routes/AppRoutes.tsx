import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "../Pages/loading";
import NotFound from "../Pages/not-found";
import Admin_layout from "../Layouts/Home";
import Liste_taches from "../Pages/Home/Employee/taches";
import Dashboard from "../Pages/Home/Employee/dashboard";
import SignIn from "../Pages/Auth/login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Profile from "../Pages/profile";
import HomeLayout from "../Layouts/Home";
import Notification from "../Pages/notification";
import ChangePersonalInfo from "../Components/ChangePersonalInfo";
import AccountForm from "../Components/CreateAccount";
import Reconnaissance from "../Components/Reconnaissance";
import Liste_taches2 from "../Pages/Home/HR/taches";
import ListeEmployees2 from "../Pages/Home/HR/employee";
import ListeEmployeesWithAttendance from "../Pages/Home/HR/checkInOut";
import Global_Dashboard from "../Pages/Home/HR/global-overview";
import Specific_Dashboard from "../Pages/Home/HR/specific-view";
import VacationRequestManager from "../Pages/Home/HR/treat-Hrequest";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Admin_layout />}></Route>
          <Route path="/employee" element={<HomeLayout />}>
            <Route path="taches" element={<Liste_taches />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="change-info" element={<ChangePersonalInfo/>}/>
          </Route>

          <Route path="/hr" element={<HomeLayout />}>
            <Route path="taches" element={<Liste_taches2 />} />
            <Route path="employee" element={<ListeEmployees2/>}/>
            <Route path="Check-in-out" element={<ListeEmployeesWithAttendance/>}/>
            <Route path="global-view" element={<Global_Dashboard/>}/>
            <Route path="specific-view" element={<Specific_Dashboard/>}/>
            <Route path="treat-conges" element={<VacationRequestManager />}/>
          </Route>

          <Route path="/admin" element={<HomeLayout />}>
           <Route path="create-account" element={<AccountForm/>}/>
           <Route path="recognition" element={<Reconnaissance/>}/>
          </Route>
          <Route path="" element={<HomeLayout/>}>
           <Route path="/notification" element={<Notification/>}/>
          <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

        </Routes>
      </Suspense>
    </Router>
  );
}
