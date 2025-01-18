"use client";
import { Label } from "@/app/components/typography/Typography";
import FormProvider from "@/app/contexts/form-context/FormContext";
import Button from "@/app/ui/atoms/Button";
import { NAV_LINKS } from "@/app/utils/data";
import { ACCOUNT_TYPE } from "@/app/utils/enums";
import { IDashboard, INavLinks } from "@/app/utils/interface";
import Hamburger from "@/public/hamburger.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import {
  BellFilled,
  CaretDownFilled,
  CompassOutlined,
  FieldTimeOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Dropdown, Layout, Menu, Space, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { relative } from "path";
import React, { isValidElement, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import useLocalStorage from "use-local-storage";
import { useProfile } from "../../hooks/auth/auth.hook";
import useFetch from "../forms/create-events/auth";




function DashboardLayout({
  children,
  title,
  steppers,
  extraComponents,
}: IDashboard): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const { profile } = useProfile();
  const [cookies, setCookie, removeCookie] = useCookies([
    "forgot_email",
    "is_registered",
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
  ]);

  // const accountType = profile?.data?.data?.data?.accountType

  const isRegistered = cookies?.is_registered === "registered";
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href="https://ostivities.tawk.help"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <Label content="Help" />
        </a>
      ),
      key: "help",
    },
    {
      label: <Label className="cursor-pointer" content="Sign out" />,
      key: "sign-out",
      onClick: () => {
        sessionStorage.removeItem("token");
        removeCookie("forgot_email");
        removeCookie("event_id");
        removeCookie("form_stage");
        removeCookie("stage_one");
        removeCookie("stage_two");
        removeCookie("stage_three");
        router.push("/login");
      },
    },
  ];
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("sidebar", true);
  const { isLoggedIn } = useFetch();
  const userProfile = isLoggedIn ? profile : null;
  const accountType = userProfile?.data?.data?.data?.accountType;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const endpoints = [
    "create-events",
    "events-created",
    "coming-soon",
    "settings",
  ];

  const userName =
    accountType === ACCOUNT_TYPE.PERSONAL
      ? userProfile?.data?.data?.data?.firstName +
        " " +
        userProfile?.data?.data?.data?.lastName
      : userProfile?.data?.data?.data?.businessName || "";

  const avatarName =
    accountType === ACCOUNT_TYPE.PERSONAL
      ? userProfile?.data?.data?.data?.firstName?.charAt(0) +
        userProfile?.data?.data?.data?.lastName?.charAt(0)
      : userProfile?.data?.data?.data?.businessName?.charAt(0).toUpperCase() + 
          userProfile?.data?.data?.data?.businessName
            ?.charAt(1)
            .toUpperCase() || "";

  const account_type =
    accountType === ACCOUNT_TYPE.PERSONAL ? "User" : "Organisation";
  const index = pathname.split("/")[2];

  const confirmIndex = endpoints.includes(index);

  const path = confirmIndex ? `/${index}` : "";

  const [currentPah, setCurrentPah] = useState(`/discover${path}`);

  const onClick: MenuProps["onClick"] = (e: any) => {
    setCurrentPah(e?.key);
    router.push(e?.key);
  };

  const pathCheck =
    pathname.split("/").includes("settings") ||
    pathname.split("/").includes("events-created") ||
    pathname.split("/").includes("coming-soon") ||
    pathname.split("/").includes("create-events");

  const toggleSidebar = () => {
    
    setCollapsed((prevValues) => !prevValues);
  };

  const [toggleNotifications, setToggleNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setToggleNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormProvider>
      <Layout
        style={{
          height: "100vh",
          fontFamily: "BricolageGrotesqueMedium",
          overflow: "hidden",
        }}
      >
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
            <Image
              src={OwanbeLogo}
              alt="ostivities Logo"
              style={{ height: "40px" }}
              className="w-[110px] cursor-pointer"
              onClick={() => {
                router.push(`/`);
              }}
            />
          </div>
          {!isLoggedIn && (
            <>
             
            </>
          )}

          {isLoggedIn && (
            <>
              <Space
                direction="horizontal"
                className="space-x-8 items-center justify-center"
                align="center"
                size={"small"}
              >
                
              </Space>
            </>
          )}
        </Header>
        <Layout>
         
          <Layout
            style={
              {
                
              }
            }
          >
           
            

            <Layout
              style={{
                padding: "0 20px",
                overflowY: "auto",
              }}
            >
              <Content className="flex flex-col space-y-8 py-8">
                {steppers && (
                  <div
                    className={`min-[577px]:mx-auto text-center min-[577px]:flex flex-row items-center min-[577px]:justify-center pb-3 ${
                      !isValidElement(steppers) ? "hidden" : ""
                    }`}
                  >
                    {steppers}
                  </div>
                )}
                {extraComponents && <div className="">{extraComponents}</div>}
                <div
                  style={{
                    borderRadius: "30px",
                    border: "1px solid #E5E5E5",
                    boxShadow: "0px 8px 24px 0px #00000014",
                    background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
                  }}
                  className="px-12 py-16"
                >
                  <div>{children}</div>
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </FormProvider>
  );
}

export default DashboardLayout;
