import theme from "@/app/theme/theme.config";
import { NAV_LINKS } from "@/app/utils/data";
import { INavLinks } from "@/app/utils/interface";
import OwanbeLogo from "@/public/ownabe.svg";
import { Button, ConfigProvider, Flex, Radio } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header(): JSX.Element {
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
      </header>
    </ConfigProvider>
  );
}

export default Header;
