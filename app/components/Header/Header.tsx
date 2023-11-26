"use client";
import theme from "@/app/theme/theme.config";
import { NAV_LINKS } from "@/app/utils/data";
import { INavLinks } from "@/app/utils/interface";
import OwanbeLogo from "@/public/ownabe.svg";
import { MenuOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Header(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        ...theme,
      }}
    >
      <header className="overflow-hidden">
        <nav className="container mx-auto relative hidden md:hidden lg:flex lg:flex-row lg:items-center lg:justify-between xl:flex xl:flex-row xl:items-center xl:justify-between py-7 px-0 md:px-5 lg:px-0 xl:px-0">
          <div>
            <Link href="/" className="" shallow>
              <Image src={OwanbeLogo} alt="Owanbe Logo" />
            </Link>
          </div>
          <div className="flex flex-row items-center space-x-8">
            {NAV_LINKS.map((link: INavLinks) => (
              <Link
                href={link.link}
                key={link.link + link.name}
                className="font-BricolageGrotesqueMedium font-medium text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-row items-center space-x-3">
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueMedium button-styles sign-in"
            >
              Sign in
            </Button>
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueMedium button-styles sign-up"
            >
              Sign Up
            </Button>
          </div>
        </nav>

        <div className="flex flex-row items-center justify-between px-5 py-3 lg:hidden xl:hidden">
          <Link href="/" className="" shallow>
            <Image src={OwanbeLogo} alt="Owanbe Logo" />
          </Link>

          <MenuOutlined
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={showDrawer}
          />
        </div>
        <Drawer
          title={
            <Image
              src={OwanbeLogo}
              alt="Owanbe Logo"
              style={{ width: "40px" }}
            />
          }
          placement="right"
          onClose={onClose}
          open={open}
          style={{ borderBottom: "none !important" }}
        >
          {NAV_LINKS.map((link: INavLinks) => (
            <p
              key={link.link + link.name}
              className="font-BricolageGrotesqueMedium py-3"
            >
              <Link href={link.link}>{link.name}</Link>
            </p>
          ))}
          <div className="flex flex-col items-start space-y-4 mt-7">
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueMedium button-styles sign-in"
            >
              Sign in
            </Button>
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueMedium button-styles sign-up"
            >
              Sign Up
            </Button>
          </div>
        </Drawer>
      </header>
    </ConfigProvider>
  );
}

export default Header;
