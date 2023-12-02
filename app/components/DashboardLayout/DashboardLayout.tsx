"use client";
import Hamburger from "@/public/hamburger.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import {
  BellFilled,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Breadcrumb, Layout, Menu, Space, theme } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const items1: MenuProps["items"] = ["1", "2", "3", "4"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //   };
    // }),
  };
});

function DashboardLayout(): JSX.Element {
  const { Header, Sider, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function generateArray() {
    const array = [];

    for (let i = 1; i <= 1000; i++) {
      array.push(i);
    }

    return array;
  }

  const myArray = generateArray();
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <div className="demo-logo flex flex-row items-center space-x-12">
          <Image
            src={OwanbeLogo}
            alt="Owanbe Logo"
            style={{ height: "40px" }}
            className="w-[110px]"
          />

          <Image
            src={Hamburger}
            alt="Owanbe Logo"
            style={{ width: "40px", height: "35px" }}
            className="cursor-pointer"
          />
        </div>

        <Space direction="horizontal" align="center">
          <Badge count={1} className="">
            <BellFilled
              className="cursor-pointer"
              style={{ fontSize: "26px", color: "#8C95A1" }}
            />
          </Badge>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          />
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: colorBgContainer, overflowY: "scroll" }}
          breakpoint="lg"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              // minHeight: "auto",
              maxHeight: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
              background: colorBgContainer,
            }}
          >
            {[...myArray].map((item) => {
              return <div key={item}>Content</div>;
            })}
          </Content>
          <Footer
            style={{
              textAlign: "center",
              fontFamily: "BricolageGrotesqueMedium",
            }}
          >
            Copyright 2023 - Ostivities all rights reserved
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
