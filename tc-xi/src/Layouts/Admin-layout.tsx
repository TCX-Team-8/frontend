import { Outlet } from "react-router-dom";
import SideBar from "../Components/Sider-bar";
import Header from "../Components/header";

export default function Admin_layout(){
    return (
    <main >
        <div className="flex flex-col place-content-between w-screen">
            <Header />
            <div className="flex place-content-between w-screen ">
            <SideBar />
            <Outlet/>
            </div>
          
        </div>

        
    </main>
    )
}