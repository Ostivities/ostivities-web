"use client";
import { Label } from "@/app/components/typography/Typography";
import FormProvider from "@/app/contexts/form-context/FormContext";
import Button from "@/app/ui/atoms/Button";
import { NAV_LINKS, EVENT_NAV_LINKS } from "@/app/utils/data";
import { ACCOUNT_TYPE } from "@/app/utils/enums";
import { IDashboard, INavLinks } from "@/app/utils/interface";
import Hamburger from "@/public/hamburger.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import { Skeleton } from "antd";
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
import CloseIcon from "@/public/close.svg";
import blank from "@/public/blank.svg";
import type { MenuProps } from "antd";
import {
  Avatar,
  Badge,
  Dropdown,
  Drawer,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { isValidElement, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import useLocalStorage from "use-local-storage";
import { useProfile, useLogout } from "../../hooks/auth/auth.hook";
import useFetch from "../forms/create-events/auth";
import emptyImage from "@/public/empty.svg";

const items1: MenuProps["items"] = [
  {
    label: "Create Event",
    key: "create-event",
  },
  {
    label: "Events created",
    key: "events-created",
  },
];

const items2: MenuProps["items"] = [
  { icon: CompassOutlined, title: "Discovery", link: "/discover" },
  {
    icon: PlusCircleOutlined,
    title: "Create Event",
    link: "/discover/create-events",
  },
  {
    icon: FileSearchOutlined,
    title: "Events Created",
    link: "/discover/events-created",
  },
  { icon: SettingOutlined, title: "Settings", link: "/discover/settings" },
  // { icon: FieldTimeOutlined, title: "Coming Soon", link: "/discover/coming-soon" },
].map((item) => {
  const key = item.link;
  return {
    key: key,
    icon: React.createElement(item.icon),
    label: (
      <span style={{ fontFamily: "bricolagegrotesqueRegular" }}>
        <a href={item.link}>{item.title}</a>
      </span>
    ),
  };
});

const items3: MenuProps["items"] = [
  { icon: CompassOutlined, title: "Discovery", link: "/discover" },
].map((item) => {
  const key = item.link;

  return {
    key: `${key}`,
    icon: React.createElement(item.icon),
    label: item.title,
  };
});

function DashboardLayout({
  children,
  title,
  steppers,
  extraComponents,
}: IDashboard): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  // const { profile } = useProfile();
  const { logoutUser } = useLogout();
  const [cookies, setCookie, removeCookie] = useCookies([
    "forgot_email",
    "is_registered",
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
    "user_fullname",
    "profileData",
  ]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const logOut = async () => {
    const res = await logoutUser.mutateAsync();
    if (res.status === 200) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("profileData");
      removeCookie("forgot_email");
      removeCookie("event_id");
      removeCookie("form_stage");
      removeCookie("stage_one");
      removeCookie("stage_two");
      removeCookie("stage_three");
      router.push("/login");
    }
  };

  // if(profile?.isFetched === true && cookies?.profileData === undefined){
  //   setCookie("profileData", JSON.stringify(profile?.data?.data?.data));
  // }
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
      onClick: async () => {
        const res = await logoutUser.mutateAsync();
        if (res.status === 200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("tokenTimestamp");
          localStorage.removeItem("token");
          localStorage.removeItem("tokenTimestamp");
          localStorage.removeItem("profileData");
          removeCookie("forgot_email");
          removeCookie("event_id");
          removeCookie("form_stage");
          removeCookie("stage_one");
          removeCookie("stage_two");
          removeCookie("stage_three");
          removeCookie("profileData");
          router.push("/login");
        }
      },
    },
  ];

  const { profile } = useProfile();
  const { isLoggedIn, loading } = useFetch();

  const initialProfileData = (() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null"
      ) {
        try {
          return JSON.parse(storedProfileData); // Return parsed data if valid
        } catch (error) {
          console.error("Failed to parse profileData:", error);
        }
      }
      return null;
    }
  })();

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isProfileReady, setIsProfileReady] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem('profileData') !== "undefined") {
  //     setProfileData(localStorage.getItem('profileData'));
  //   }
  //   }, []);
  // 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null" &&
        JSON.stringify(initialProfileData) !== storedProfileData
      ) {
        try {
          setProfileData(JSON.parse(storedProfileData));
        } catch (error) {
          console.error("Failed to parse profileData:", error);
        }
      }
      setIsProfileReady(true);
    }
  }, [initialProfileData]);

  // 

  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("sidebar", true);

  // const userProfile = isLoggedIn ? profile : null;
  // 
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const endpoints = [
    "create-events",
    "events-created",
    "coming-soon",
    "settings",
  ];

  const accountType =
    profile?.data?.data?.data?.accountType || profileData?.accountType;

  // 

  const userName =
    accountType === ACCOUNT_TYPE.PERSONAL
      ? profile?.data?.data?.data?.firstName &&
        profile?.data?.data?.data?.lastName
        ? `${profile?.data?.data?.data?.firstName} ${profile?.data?.data?.data?.lastName}`
        : `${profileData?.firstName || ""} ${profileData?.lastName || ""}`
      : profile?.data?.data?.data?.businessName ||
        profileData?.businessName ||
        "";
  // 
  // setCookie("user_fullname", userName)
  const avatarName =
    accountType === ACCOUNT_TYPE.PERSONAL
      ? profileData?.firstName?.charAt(0) + profileData?.lastName?.charAt(0)
      : profileData?.businessName?.charAt(0).toUpperCase() +
          profileData?.businessName?.charAt(1).toUpperCase() || "";

  const account_type =
    accountType === ACCOUNT_TYPE.PERSONAL ? "User" : "Organisation";
  const index = pathname.split("/")[2];

  const confirmIndex = endpoints.includes(index);

  const path = confirmIndex ? `/${index}` : "";

  const [currentPah, setCurrentPah] = useState(`/discover${path}`);

  // const onClick: MenuProps["onClick"] = (e: any) => {
  //   setCurrentPah(e?.key);
  //   router.push(e?.key);
  // };
  const onClick: MenuProps["onClick"] = (e: any) => {
    setCurrentPah(e?.key); // Update the current selected path
    router.push(e?.key); // Navigate to the new route
  };

  const pathCheck =
    pathname.split("/").includes("settings") ||
    pathname.split("/").includes("events-created") ||
    pathname.split("/").includes("coming-soon") ||
    pathname.split("/").includes("create-events");

  const showNavLinks = !pathCheck && pathname !== "/discover";

  const toggleSidebar = () => {
    // 
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
          className="hidden md:hidden lg:flex"
          style={{
            // display: "flex",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            borderBottom: "2px solid #d0d4d4",
          }}
        >
          <div className="demo-logo flex flex-row items-center space-x-12">
            <a href="/">
              <Image
                src={OwanbeLogo}
                alt="ostivities Logo"
                style={{ height: "40px" }}
                className="w-[110px] cursor-pointer"
              />
            </a>
          </div>

          {profile?.isFetching === true || !isProfileReady ? (
            <>
              <Skeleton.Button
                active
                shape="round"
                style={{
                  height: "10px",
                  width: "10px",
                  maxWidth: "100%",
                }}
              />
            </>
          ) : profileData === null && !isLoggedIn ? (
            <>
              {/* Show NAV_LINKS when user is not logged in */}
              <div className="flex flex-row items-center space-x-8">
                {NAV_LINKS.map((link: INavLinks) => (
                  <Link
                    href={link.link}
                    key={link.link + link.name}
                    className="font-BricolageGrotesqueMedium font-medium text-base text-black"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Show buttons based on isRegistered status */}
              <div className="flex flex-row items-end justify-end space-x-3">
                {isRegistered ? (
                  // If user is registered but not logged in, show only Sign In button
                  <Link href="/login" passHref>
                    <Button
                      variant="outline"
                      label="Sign in"
                      className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    />
                  </Link>
                ) : (
                  // If user is not registered, show both Sign In and Sign Up buttons
                  <>
                    <Link href="/login" passHref>
                      <Button
                        variant="outline"
                        label="Sign in"
                        className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                      />
                    </Link>
                    <Link href="/signup" passHref>
                      <Button label="Create Event" />
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            (profileData !== null || profile?.isFetched === true) &&
            isLoggedIn && (
              <>
                <Space
                  direction="horizontal"
                  className="space-x-8 items-center justify-center"
                  align="center"
                  size={"small"}
                >
                 
                  <Dropdown menu={{ items }} trigger={["click", "hover"]}>
                    <div className="flex-center gap-4 cursor-pointer">
                      <Image
                        src={
                          profile?.data?.data?.data?.image ||
                          profileData?.image ||
                          emptyImage
                        } // Fallback to imported empty image
                        alt="Profile Picture"
                        width={40} // Adjust this to match the previous avatar size if needed
                        height={40} // Adjust this to match the previous avatar size if needed
                        className="object-cover rounded-full"
                        style={{
                          cursor: "pointer", // Keep the cursor style for interaction
                        }}
                      />

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
                  </Dropdown>
                </Space>
              </>
            )
          )}
        </Header>
        <div className=" bg-white shadow-sm flex flex-row items-center justify-between px-2 py-3 lg:hidden">
          <Link href="/" shallow>
            <Image
                src={OwanbeLogo}
                alt="ostivities Logo"
              style={{ width: "130px", height: "50px", cursor: "pointer" }}
            />
          </Link>

          <Image
            src={Hamburger}
            alt="menu drawer"
            style={{ width: "40px", height: "35px", cursor: "pointer" }}
            onClick={showDrawer}
          />
        </div>
        <Drawer
          closeIcon={
            <Image
              src={blank}
              alt="Owanbe Logo"
              style={{ width: "130px", height: "50px" }}
            />
          }
          extra={
            <Image
              src={CloseIcon}
              alt="close icon"
              style={{ width: "40px", height: "35px" }}
              onClick={onClose}
            />
          }
          placement="right"
          open={open}
          style={{ borderBottom: "0px solid !important", width: "100%" }}
        >
          {profile?.isFetching === true || !isProfileReady ? (
            <>
              <Skeleton.Button
                active
                shape="round"
                style={{
                  height: "10px",
                  width: "10px",
                  maxWidth: "100%",
                }}
              />
            </>
          ) : profileData === null && !isLoggedIn ? (
            <>
              {/* Show NAV_LINKS when user is not logged in */}
              {/* <div className="flex flex-row items-center space-x-8"> */}
              {/* </div> */}

              {/* Show buttons based on isRegistered status */}
              <div className="font-BricolageGrotesqueMedium items-center flex flex-col justify-center cursor-pointer">
                {NAV_LINKS.map((link: INavLinks) => (
                  <Link
                    href={link.link}
                    key={link.link + link.name}
                    className="font-BricolageGrotesqueMedium py-3 text-center"
                  >
                    {link.name}
                  </Link>
                ))}
                
              </div>
            </>
          ) : (
            (profileData !== null || profile?.isFetched === true) &&
            isLoggedIn && (
              <>
                <div className="font-BricolageGrotesqueMedium items-center flex flex-col justify-center cursor-pointer">
                  <Image
                    src={
                      profile?.data?.data?.data?.image ||
                      profileData?.image ||
                      emptyImage
                    } // Fallback to imported empty image
                    alt="Profile Picture"
                    width={50} // Adjust this to match the previous avatar size if needed
                    height={50} // Adjust this to match the previous avatar size if needed
                    className="object-cover rounded-full"
                    style={{
                      cursor: "pointer", // Keep the cursor style for interaction
                    }}
                  />
                  <div className="h-fit py-3">
                    <h3 className="font-BricolageGrotesqueMedium text-sm text-OWANBE_TABLE_CELL">
                      {userName}
                    </h3>
                  </div>
                </div>
                <hr />
                {EVENT_NAV_LINKS.map((link: INavLinks) => (
                  <p
                    key={link.link + link.name}
                    className="font-BricolageGrotesqueMedium py-3 text-center"
                  >
                    <Link
                      href={link.link}
                      onClick={onClose}
                      style={{
                        color:
                          typeof window !== "undefined" &&
                          window.innerWidth <= 768
                            ? "#000000"
                            : "#000000", // Check if window is defined
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = "#E20000"; // Change to red on hover
                      }}
                      onMouseLeave={(e) => {
                        if (typeof window !== "undefined") {
                          (e.target as HTMLElement).style.color =
                            window.innerWidth <= 768 ? "#000000" : "#000000";
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </p>
                ))}
              </>
            )
          )}

          <div className="flex flex-col items-center justify-center space-y-4 mt-7 mx-auto w-3/5 md:w-1/5">
            {!isLoggedIn ? (
              isRegistered ? (
                // Show only Sign In button if user is registered but not logged in
                <Link href="/login" passHref>
                  <Button
                    variant="outline"
                    label="Sign in"
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                  />
                </Link>
              ) : (
                // Show both Sign In and Sign Up buttons if user is not registered
                <>
                  <Link href="/login" passHref>
                    <Button
                      variant="outline"
                      label="Sign in"
                      className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    />
                  </Link>
                  <Link href="/signup" passHref>
                    <Button label="Create Event" />
                  </Link>
                </>
              )
            ) : (
              // Show My Account button if user is logged in
              <button
                type="submit"
                // size={"large"}
                className="font-BricolageGrotesqueSemiBold continue cursor-pointer py-2 font-bold equal-width-button"
                onClick={async () => {
                  const res = await logoutUser.mutateAsync();
                  if (res.status === 200) {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("tokenTimestamp");
                    localStorage.removeItem("token");
                    localStorage.removeItem("tokenTimestamp");
                    localStorage.removeItem("profileData");
                    removeCookie("forgot_email");
                    removeCookie("event_id");
                    removeCookie("form_stage");
                    removeCookie("stage_one");
                    removeCookie("stage_two");
                    removeCookie("stage_three");
                    removeCookie("profileData");
                    router.push("/login");
                  }
                }}
                // label="Sign Out"
              >
                Sign Out
              </button>
            )}
          </div>
        </Drawer>

        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
              // overflowY: 'scroll',
              fontFamily: "BricolageGrotesqueMedium !important",
              paddingTop: "1px",
            }}
            className="hidden lg:block"
            breakpoint="lg"
            trigger={null}
            collapsible
            collapsed={collapsed}
            zeroWidthTriggerStyle={{
              background: "green !important",
              fontFamily: "BricolageGrotesqueMedium !important",
            }}
            onBreakpoint={(broken: any) => {
              // 
            }}
          >
            <Image
              src={Hamburger}
              alt="menu drawer"
              style={{
                width: "40px",
                height: "35px",
                borderRadius: "10px",
                margin: "1rem",
              }}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
            <Menu
              mode="inline"
              defaultSelectedKeys={[currentPah]}
              // defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
                borderRight: 0,
                border: 0,
                fontFamily: "BricolageGrotesqueMedium !important",
              }}
              items={isLoggedIn ? items2 : items3}
              onClick={onClick}
              selectedKeys={[currentPah]}
              className={`${
                collapsed === true ? "collapsed-side-nav" : "side-nav"
              }`}
            />
          </Sider>
          <Layout
            style={
              {
                // paddingBottom: '2rem',
              }
            }
          >
            <Header
              className={`${
                !pathname.split("/").includes("events-created") ? "hidden" : "flex"
              } lg:flex`}
              style={{
                // display: "flex",
                alignItems: "center",
                padding: 20,
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="demo-logo w-full">
                <h5 className="w-full font-BricolageGrotesqueRegular font-normal text-black text-3xl">
                  {title}
                </h5>
              </div>

              {title === "Events Creation" && (
                <Menu
                  theme="light"
                  mode="horizontal"
                  defaultSelectedKeys={["create-event"]}
                  items={items1}
                  className="w-1/2 justify-end font-BricolageGrotesqueMedium"
                />
              )}
            </Header>

            <Layout
              className="md:px-5"
              style={{
                // padding: "0 20px",
                overflowY: "auto",
              }}
            >
              <Content className="flex flex-col space-y-8 py-8">
                {steppers && (
                  <div
                    className={`min-[577px]:mx-auto text-center min-[577px]:flex flex-row items-center min-[577px]:justify-center max-[577px]:pl-3 pb-3 ${
                      !isValidElement(steppers) ? "hidden" : ""
                    }`}
                  >
                    {steppers}
                  </div>
                )}
                {extraComponents && <div className="">{extraComponents}</div>}
                <div
                  style={{
                    // borderRadius: "30px",
                    border: "1px solid #E5E5E5",
                    boxShadow: "0px 8px 24px 0px #00000014",
                    background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
                  }}
                  className="px-4 py-10 md:px-12 md:py-16  md:rounded-[30px]"
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
