import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sider-bar";

export default function Employee_layout() {
  return (
    <main className="flex place-content-between w-screen">
      <SideBar />
      <Outlet />
    </main>
  );
}
