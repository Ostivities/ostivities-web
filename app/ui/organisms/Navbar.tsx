"use client";

import React, { SetStateAction } from "react";
import Link from 'next/link';

import {
  Avatar,
  Badge,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  theme,
} from "antd";

import OwanbeLogo from "@/public/owanbe.svg";

import Hamburger from "@/public/hamburger.svg"; 

import {
  BellFilled,
  CompassOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import Image from "next/image";
import { Label } from "@/app/components/typography/Typography";

const items: MenuProps["items"] = [
  {
    label: <Label className="cursor-pointer" content="Help" />,
    key: "help",
  },
  {
    label: <Label className="cursor-pointer" content="Sign out" />,
    key: "sign-",
  },
];

const Navbar = ({ setCollapsed }: { setCollapsed: () => void }) => {
  const { Header, Sider, Content } = Layout;
  return (
    <nav className="w-full">
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
        <Link href="/" passHref>
          <Image
            src={OwanbeLogo}
            alt="Owanbe Logo"
            style={{ height: "40px" }}
            className="w-[110px] cursor-pointer"
          />
          </Link>

          <Image
            src={Hamburger}
            alt="Owanbe Logo"
            style={{ width: "40px", height: "35px", borderRadius: '10px' }}
            className="cursor-pointer"
            onClick={setCollapsed}
          />
        </div>

        <Space
          direction="horizontal"
          className="space-x-8 items-center justify-center"
          align="center"
          size={"small"}
        >
          <div className="mt-5">
            <Badge count={2}>
              <BellFilled
                className="cursor-pointer"
                style={{
                  fontSize: "26px",
                  color: "#757474",
                }}
              />
            </Badge>
          </div>
          <Dropdown menu={{ items }} trigger={["click", "hover"]}>
            <Avatar
              size={40}
              style={{
                background: "#E20000",
                fontFamily: "BricolageGrotesqueMedium",
                cursor: "pointer",
              }}
            >
              OR
            </Avatar>
          </Dropdown>
        </Space>
      </Header>
    </nav>
  );
};

export default Navbar;
