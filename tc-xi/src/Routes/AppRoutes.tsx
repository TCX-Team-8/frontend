import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "../Pages/loading";
import NotFound from "../Pages/not-found";
import Admin_layout from "../Layouts/Admin-layout";
import Liste_taches from "../Pages/Home/Employee/taches";
import Login from "../Pages/Auth/login";
import Employee_layout from "../Layouts/Employee-layout";
import Dashboard from "../Pages/Home/Employee/dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Admin_layout />}></Route>
          <Route path="/employee" element={<Employee_layout />}>
            <Route path="taches" element={<Liste_taches />} />
            <Route path="dashboard" element={<Dashboard />} />
            
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
