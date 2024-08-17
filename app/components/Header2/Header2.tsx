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

function Header2(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const pathCheck =
    pathname.includes('password-reset') ||
    pathname.includes('forgot-password') ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/verify-account';

  // Check if NAV_LINKS should be displayed
  const showNavLinks = !pathCheck && pathname !== '/Dashboard'; // Add other pages as needed

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
            <Link href="/" className="" shallow>
              <Image
                src={OwanbeLogo}
                alt="Owanbe Logo"
                style={{ height: '40px' }}
                className="w-[110px]"
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
              {isNotLoggedIn ? (
                <>
                  <Button
                    variant="outline"
                    label="Sign in"
                    onClick={() => router.push('/login')}
                  />
                  <Button
                    label="Sign Up"
                    onClick={() => router.push('/signup')}
                  />
                </>
              ) : (
                <Button
                  label="My Account"
                  onClick={() => router.push('/Dashboard')}
                />
              )}
            </div>
          )}
        </nav>

        {/* SM AND MD SCREENS */}
        <div className="flex flex-row items-center justify-between px-5 py-3 lg:hidden">
          <Link href="/" className="" shallow>
            <Image
              src={OwanbeLogo}
              alt="Owanbe Logo"
              style={{ width: '80px', height: '40px' }}
            />
          </Link>

          
        </div>
        <Drawer
          closeIcon={
            <Image
              src={OwanbeLogo}
              alt="Owanbe Logo"
              style={{ width: '80px', height: '40px' }}
            />
          }
          extra={
            <Image
              src={CloseIcon}
              alt="Owanbe Logo"
              style={{ width: '40px', height: '35px' }}
              onClick={onClose}
            />
          }
          placement="right"
          open={open}
          style={{ borderBottom: '0px solid !important', width: '100%' }}
        >
          {showNavLinks && (
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
                {isNotLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      label="Sign in"
                      className="max-w-full"
                      onClick={() => router.push('/login')}
                    />
                    <Button
                      label="Sign Up"
                      className="max-w-full"
                      onClick={() => router.push('/signup')}
                    />
                  </>
                ) : (
                  <Button
                    label="My Account"
                    className="max-w-full"
                    onClick={() => router.push('/Dashboard')}
                  />
                )}
              </>
            )}
          </div>
        </Drawer>
      </header>
    </ConfigProvider>
  );
}

export default Header2;
