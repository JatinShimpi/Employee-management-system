import React, { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "option 1"},
  { key: "2", icon: <DesktopOutlined />, label: "Employees" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
];

const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);

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
        items={items}
        className="h-[calc(100vh-108px)]"
      />
    </div>
  );
};

export default Sider;
