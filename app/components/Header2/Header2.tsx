'use client';
import theme from '@/app/theme/theme.config';
import Button from '@/app/ui/atoms/Button';
import { NAV_LINKS } from '@/app/utils/data';
import { INavLinks } from '@/app/utils/interface';
import CloseIcon from '@/public/close.svg';
import Hamburger from '@/public/hamburger.svg';
import OwanbeLogo from '@/public/owanbe.svg';
import { ConfigProvider, Drawer } from 'antd'; 
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import blank from "@/public/blank.svg";
import { useCookies } from "react-cookie";
import useFetch from "../forms/create-events/auth";

function Header2(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const { isLoggedIn } = useFetch();
  const [cookies, setCookie] = useCookies([
    "is_registered",
    "user_email",
    "user_password",
  ]);

  const isRegistered = cookies?.is_registered === "registered";

  const pathCheck =
    pathname.includes('password-reset') ||
    pathname.includes('forgot-password') ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/verify-account';

  // Check if NAV_LINKS should be displayed
  const showNavLinks = !pathCheck && pathname !== '/discover'; // Add other pages as needed

  const isNotLoggedIn = !['/login', '/signup'].includes(pathname);

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
      <header>
        {/* LG && XL SCREENS */}
        <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 px-8 py-5 hidden md:hidden lg:grid lg:grid-cols-3 lg:items-center">
          <div>
            <Link href="/" shallow>
              <Image
                src={OwanbeLogo}
                alt=""
                style={{ height: '40px' }}
                className="w-[140px]"
              />
            </Link>
          </div>
          {/* Conditionally render NAV_LINKS */}
          {showNavLinks && (
            <div className="flex flex-row items-center space-x-8">
              {NAV_LINKS.map((link: INavLinks) => (
                <Link
                  href={link.link}
                  key={link.link + link.name}
                  className="font-BricolageGrotesqueMedium font-medium text-base text-black hover:text-OWANBE_PRY"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
          {/* Conditional Buttons Rendering */}
          {!pathCheck && (
            <div className="flex flex-row items-end justify-end space-x-3">
              {!isLoggedIn ? (
                isRegistered ? (
                  // Show only Sign In button if user is registered but not logged in
                  <Link href="/login" passHref>
                    <Button variant="outline" label="Sign in" 
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"/>
                  </Link>
                ) : (
                  // Show both Sign In and Sign Up buttons if user is not registered
                  <>
                    <Link href="/login" passHref>
                      <Button variant="outline" label="Sign in" 
                      className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold" />
                    </Link>
                    <Link href="/signup" passHref>
                      <Button label="Create Event" />
                    </Link>
                  </>
                )
              ) : (
                // Show My Account button if user is logged in
                <Link href="/discover" passHref>
                  <Button label="My Account" />
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* SM AND MD SCREENS */}
        <div className="bg-white shadow-sm flex flex-row items-center justify-between px-2 py-3 lg:hidden">
          <Link href="/" shallow>
            <Image
              src={OwanbeLogo}
              alt=""
              style={{ width: "110px", height: "50px" }}
            />
          </Link>

          {/* <Image
            src={Hamburger}
            alt=""
            style={{ width: "40px", height: "35px" }}
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
              alt=""
              style={{ width: "40px", height: "35px" }}
              onClick={onClose}
            />
          }
          placement="right"
          open={open}
          style={{ borderBottom: "0px solid !important", width: "100%" }}
        > */}
        </div>
          {/* {showNavLinks && (
            <>
              {NAV_LINKS.map((link: INavLinks) => (
                <p
                  key={link.link + link.name}
                  className="font-BricolageGrotesqueMedium py-3 text-center"
                >
                  <Link href={link.link} onClick={onClose}>
                    {link.name}
                  </Link>
                </p>
              ))}
            </>
          )}
          <div className="flex flex-col items-center justify-center space-y-4 mt-7 mx-auto w-3/5 md:w-1/5">
            {!pathCheck && (
              <>
                {!isLoggedIn ? (
                  isRegistered ? (
                    // Show only Sign In button if user is registered but not logged in
                    <Link href="/login" passHref>
                      <Button variant="outline" label="Sign in" 
                      className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"/>
                    </Link>
                  ) : (
                    // Show both Sign In and Sign Up buttons if user is not registered
                    <>
                      <Link href="/login" passHref>
                        <Button variant="outline" label="Sign in" 
                        className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"/>
                      </Link>
                      <Link href="/signup" passHref>
                        <Button label="Sign Up" />
                      </Link>
                    </>
                  )
                ) : (
                  // Show My Account button if user is logged in
                  <Link href="/discover" passHref>
                    <Button label="My Account" />
                  </Link>
                )}
              </>
            )}
          </div> */}
        {/* </Drawer> */}
      </header>
    </ConfigProvider>
  );
}

export default Header2;
