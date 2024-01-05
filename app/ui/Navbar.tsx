"use client";

import React, { useState } from "react";
import { Menu, Layout, Typography } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header } = Layout;

const Navbar = () => {
  const items: MenuProps["items"] = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: "alipay",
    },
  ];

  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Header className="flex justify-between items-center" style={{alignItems: 'center'}}>
      <div className="logo">
        Data Visualization Tool
        </div>
    </Header>
  );
};

export default Navbar;
