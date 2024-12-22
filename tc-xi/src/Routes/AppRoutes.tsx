import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "../Pages/loading";
import NotFound from "../Pages/not-found";
import HomeLayout from "../Layouts/Home";
import SignIn from "../Pages/Auth/login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Profile from "../Pages/profile";
import Notification from "../Pages/notification";
import ChangePersonalInfo from "../Components/ChangePersonalInfo";
import AccountForm from "../Pages/Home/Administrator/CreateAccount";
import Reconnaissance from "../Pages/Home/Administrator/Reconnaissance";
import Liste_taches from "../Pages/Home/Employee/taches";
import Dashboard from "../Pages/Home/Employee/dashboard";
import Liste_taches2 from "../Pages/Home/HR/taches";
import ListeEmployees2 from "../Pages/Home/HR/employee";
import ListeEmployeesWithAttendance from "../Pages/Home/HR/checkInOut";
import Global_Dashboard from "../Pages/Home/HR/global-overview";
import Specific_Dashboard from "../Pages/Home/HR/specific-view";
import VacationRequestManager from "../Pages/Home/HR/treat-Hrequest";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />

          {/* Auth routes */}
          <Route index element={<SignIn />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Employee routes */}
            <Route path="/employee/:ssn" element={<HomeLayout />}>
              <Route path="notification" element={<Notification />} />
              <Route path="taches" element={<Liste_taches />} />
              <Route index  element={<Dashboard />} />
              <Route path="change-info" element={<ChangePersonalInfo />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* HR routes */}
            <Route path="/hr/:ssn" element={<HomeLayout />}>
              <Route path="notification" element={<Notification />} />
              <Route path="taches" element={<Liste_taches2 />} />
              <Route path="employee" element={<ListeEmployees2 />} />
              <Route path="Check-in-out" element={<ListeEmployeesWithAttendance />} />
              <Route index  element={<Global_Dashboard />} />
              <Route path="specific-view/:ssn" element={<Specific_Dashboard />} />
              <Route path="treat-conges" element={<VacationRequestManager />} />
              <Route path="change-info" element={<ChangePersonalInfo />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/:ssn" element={<HomeLayout />}>
              <Route path="create-account" element={<AccountForm />} />
              <Route index  element={<Reconnaissance />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Shared routes */}
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}
