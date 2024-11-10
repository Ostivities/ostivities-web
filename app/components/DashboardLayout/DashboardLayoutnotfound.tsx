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
    console.log(collapsed);
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
              alt="Ostivities Logo"
              style={{ height: "40px" }}
              className="w-[110px] cursor-pointer"
              onClick={() => {
                router.push(`/`);
              }}
            />
          </div>
          {!isLoggedIn && (
            <>
             

              {/* Show buttons based on isRegistered status
              <div className="flex flex-row items-end justify-end space-x-3">
                {isRegistered ? (
                  // If user is registered but not logged in, show only Sign In button
                  <Button
                    variant="outline"
                    label="Sign in"
                    onClick={() => router.push("/login")}
                  />
                ) : (
                  // If user is not registered, show both Sign In and Sign Up buttons
                  <>
                    <Button
                      variant="outline"
                      label="Sign in"
                      onClick={() => router.push("/login")}
                    />
                    <Button
                      label="Sign Up"
                      onClick={() => router.push("/signup")}
                    />
                  </>
                )}
              </div> */}
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
                {/* <div className="mt-5 relative">
                  <Badge count={2}>
                    <BellFilled
                      className="cursor-pointer"
                      style={{
                        fontSize: "26px",
                        color: "#8C95A1",
                      }}
                      onClick={() => setToggleNotifications((prev) => !prev)}
                    />
                  </Badge>
                  <div
                   ref={notificationRef}
                    className={`fixed top-16 right-0 min-w-[30rem] w-[30rem] transition-all z-50 ${
                      toggleNotifications
                        ? " translate-y-0"
                        : "-translate-y-[150%]"
                    }`}
                  >
                    <div className="bg-white rounded-[1.25rem] pl-6 pr-7 pt-4 pb-10 shadow-ticket-card">
                      <div className="text-center font-semibold">
                        Notifications
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex-center gap-3">
                          <div className="!bg-OWANBE_NOTIFICATION w-4 h-4 rounded-full"></div>
                          <p
                            className="text-base font-normal"
                            style={{ fontSize: "14px" }}
                          >
                            You have a new sale{" "}
                            <a
                              href="#"
                              style={{
                                color: "#e20000",
                                textDecoration: "underline",
                                fontSize: "14px",
                              }}
                            >
                              click to view
                            </a>
                            .
                          </p>
                        </div>
                        <div className="flex-center gap-3">
                          <div className=" !bg-OWANBE_NOTIFICATION w-4 h-4 rounded-full"></div>
                          <p
                            className="text-base font-normal"
                            style={{ fontSize: "14px" }}
                          >
                            You have a new attendee{" "}
                            <a
                              href="#"
                              style={{
                                color: "#e20000",
                                textDecoration: "underline",
                                fontSize: "14px",
                              }}
                            >
                              click to view
                            </a>
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <Dropdown menu={{ items }} trigger={["click", "hover"]}>
                  <div className="flex-center gap-4 cursor-pointer">
                    <Avatar
                      size={40}
                      style={{
                        background: "#E20000",
                        fontFamily: "BricolageGrotesqueMedium",
                        cursor: "pointer",
                      }}
                    >
                      {avatarName}
                    </Avatar>
                    <div className="h-fit flex gap-4">
                      <div className="flex flex-col justify-start">
                        <h3 className=" text-sm text-OWANBE_TABLE_CELL">
                          {userName}
                        </h3>
                        <span className="text-xs text-[#8C95A1]">
                          {account_type}
                        </span>
                      </div>
                      <CaretDownFilled />
                    </div>
                  </div>
                </Dropdown> */}
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
                    className={`mx-auto text-center flex flex-row items-center justify-center pb-3 ${
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
