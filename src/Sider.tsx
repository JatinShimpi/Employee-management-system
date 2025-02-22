import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const Sider = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    { key: "/dashboard", icon: <PieChartOutlined />, label: "Homepage" },
    {
      key: "/dashboard/employees",
      icon: <DesktopOutlined />,
      label: "Employees",
    },
    {
      key: "/dashboard/departments",
      icon: <ContainerOutlined />,
      label: "Departments",
    },
    {
      key:"signup",
      icon: <MdPersonAdd/>,
      label:"Signup",
    }
  ];

  const [collapsed, setCollapsed] = useState(false);

  const navigator: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="bg-gray-900 flex flex-col">
      <Button
        type="primary"
        onClick={toggleCollapsed}
        className="mt-1 mx-auto bg-blue-900 w-[70px]"
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={navigator}
        items={items}
        className="h-[calc(100vh-108px)]"
      />
    </div>
  );
};

export default Sider;
