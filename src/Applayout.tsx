import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Your Navbar component
import Sider from "./Sider"; // Your Sidebar component

const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-row">
        <Sider />

        <div className="w-full bg-gray-100 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
