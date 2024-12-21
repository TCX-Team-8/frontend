import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "../Pages/loading";
import NotFound from "../Pages/not-found";
import Admin_layout from "../Layouts/Home";
import Liste_taches from "../Pages/Home/Employee/taches";
import Liste_taches2 from "../Pages/Home/HR/taches";
import Dashboard from "../Pages/Home/Employee/dashboard";
import Global_Dashboard from "../Pages/Home/HR/global-overview";
import Specific_Dashboard from "../Pages/Home/HR/specific-view";
import ListeEmployeesWithAttendance from "../Pages/Home/HR/checkInOut";
import SignIn from "../Pages/Auth/login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Profile from "../Pages/profile";
import HomeLayout from "../Layouts/Home";
import Notification from "../Pages/notification";
import ListeEmployees2 from "../Pages/Home/HR/employee";
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
          </Route>
          <Route path="" element={<HomeLayout />}>
            <Route path="/hr/taches" element={<Liste_taches2 />} />
            <Route path="/hr/employee" element={<ListeEmployees2/>}/>
            <Route path="/hr/Check-in-out" element={<ListeEmployeesWithAttendance/>}/>
            <Route path="/hr/global-view" element={<Global_Dashboard/>}/>
            <Route path="/hr/specific-view" element={<Specific_Dashboard/>}/>
            <Route path="/hr/treat-conges" element={<VacationRequestManager />}/>
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
