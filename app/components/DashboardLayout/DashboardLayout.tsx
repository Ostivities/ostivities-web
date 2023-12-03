"use client";
import Hamburger from "@/public/hamburger.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import { BellFilled, SettingOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Breadcrumb, Layout, Menu, Space, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const items2: MenuProps["items"] = [
  { icon: UserOutlined, title: "Event Discovery", link: "/dashboard" },
  { icon: UserOutlined, title: "Events Creation", link: "/dashboard/events" },
  { icon: SettingOutlined, title: "Settings", link: "/dashboard/settings" },
].map((icon) => {
  const key = icon.link;

  

  return {
    key: `${key}`,
    icon: React.createElement(icon.icon),
    label: icon.title,

    // HANDLES SUB MENU ON SIDE BAR
    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //   };
    // }),
  };
});

function DashboardLayout({
  children,
  title,
}: {
  children?: React.ReactNode;
  title?: string;
}): JSX.Element {
  const router = useRouter();
  const { Header, Sider, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps["onClick"] = (e: any) => {
    console.log(e, "click");
    router.push(e?.key);
  };

  return (
    <Layout style={{ height: "100vh", fontFamily: "BricolageGrotesqueMedium" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: 20,
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          borderBottom: "2px solid #d0d4d4",
        }}
      >
        <div className="demo-logo flex flex-row items-center space-x-12">
          <Image
            src={OwanbeLogo}
            alt="Owanbe Logo"
            style={{ height: "40px" }}
            className="w-[110px] cursor-pointer"
          />

          <Image
            src={Hamburger}
            alt="Owanbe Logo"
            style={{ width: "40px", height: "35px" }}
            className="cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <Space
          direction="horizontal"
          className="space-x-8 items-center justify-center"
          align="center"
          size={"small"}
        >
          <div className="mt-5">
            <Badge count={1}>
              <BellFilled
                className="cursor-pointer"
                style={{
                  fontSize: "26px",
                  color: "#8C95A1",
                }}
              />
            </Badge>
          </div>

          <Avatar
            size={40}
            style={{
              background: "#E20000",
              fontFamily: "BricolageGrotesqueMedium",
              cursor: "pointer",
            }}
          >
            IR
          </Avatar>
        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
            overflowY: "scroll",
            fontFamily: "BricolageGrotesqueMedium !important",
            paddingTop: "60px",
          }}
          breakpoint="lg"
          trigger={null}
          collapsible
          collapsed={collapsed}
          zeroWidthTriggerStyle={{
            background: "green !important",
            fontFamily: "BricolageGrotesqueMedium !important",
          }}
          onBreakpoint={(broken: any) => {
            console.log(broken, "broken");
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              fontFamily: "BricolageGrotesqueMedium !important",
            }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              padding: 20,
              justifyContent: "space-between",
              backgroundColor: "#ffffff",
            }}
          >
            <div className="demo-logo flex flex-row items-center space-x-12">
              <h5 className="font-BricolageGrotesqueRegular font-normal text-black text-3xl">
                {title}
              </h5>
            </div>
          </Header>

          <Layout style={{ padding: "0 30px 30px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
            <Content
              style={{
                padding: 30,
                margin: 0,
                height: "auto",
                // maxHeight: "auto",
                overflowY: "scroll",
                overflowX: "hidden",
                borderRadius: "30px",
                border: "1px solid #E5E5E5",
                boxShadow: "0px 8px 24px 0px #00000014",
                background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
              }}
            >
              <div>{children}</div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
