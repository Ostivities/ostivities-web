"use client";
import theme from "@/app/theme/theme.config";
import { NAV_LINKS } from "@/app/utils/data";
import { INavLinks } from "@/app/utils/interface";
import CloseIcon from "@/public/close.svg";
import Hamburger from "@/public/hamburger.svg";
import OwanbeLogo from "@/public/owanbe.svg";
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
            <Image
              src={OwanbeLogo}
              alt="Owanbe Logo"
              style={{ width: "60px", height: "40px" }}
            />
          </Link>

          <Image
            src={Hamburger}
            alt="Owanbe Logo"
            style={{ width: "24px", height: "24px" }}
            onClick={showDrawer}
          />
        </div>
        <Drawer
          closeIcon={
            <Image
              src={OwanbeLogo}
              alt="Owanbe Logo"
              style={{ width: "40px" }}
            />
          }
          extra={
            <Image
              src={CloseIcon}
              alt="Owanbe Logo"
              style={{ width: "24px", height: "24px" }}
              onClick={onClose}
            />
          }
          placement="right"
          // onClose={onClose}
          open={open}
          style={{ borderBottom: "0px solid !important", width: "100%" }}
        >
          {NAV_LINKS.map((link: INavLinks) => (
            <p
              key={link.link + link.name}
              className="font-BricolageGrotesqueMedium py-3 text-center"
            >
              <Link href={link.link}>{link.name}</Link>
            </p>
          ))}
          <div className="flex flex-col items-center justify-center space-y-4 mt-7 mx-auto w-3/5">
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueMedium button-styles sign-in"
              onClick={() => {}}
              style={{ width: "100%" }}
            >
              Sign in
            </Button>
            <Button
              type="default"
              size={"large"}
              className="font-BricolageGrotesqueMedium button-styles sign-up"
              onClick={() => {}}
              style={{ width: "100%" }}
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
