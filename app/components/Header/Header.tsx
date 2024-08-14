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

function Header(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false); 

  const pathCheck =
    pathname.split('/').includes('password-reset') ||
    pathname.split('/').includes('forgot-password');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isNotLoggedIn = ['/login', '/signup'].includes(pathname);

  return (
    <ConfigProvider
      theme={{
        ...theme,
      }}
    >
      <header className="overflow-hidden">
        {/* LG && XL SCREENS */}
        <nav className="container mx-auto relative hidden md:hidden lg:grid lg:grid-cols-3 py-5 px-0 md:px-5 lg:px-0">
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

          {!pathCheck && (
            <div className="flex flex-row items-end justify-end space-x-3">
              {isNotLoggedIn ? null : (
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

          <Image
            src={Hamburger}
            alt="Owanbe Logo"
            style={{ width: '40px', height: '35px' }}
            onClick={showDrawer}
          />
        </div>
        <Drawer
          closeIcon={
            <Image
              src={OwanbeLogo}
              alt="Owanbe Logo"
              style={{ width: '70px' }}
            />
          }
          extra={
            <Image
              src={CloseIcon}
              alt="Owanbe Logo"
              style={{ width: '80px', height: '40px' }}
              onClick={onClose}
            />
          }
          placement="right"
          // onClose={onClose}
          open={open}
          style={{ borderBottom: '0px solid !important', width: '100%' }}
        >
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
          <div className="flex flex-col items-center justify-center space-y-4 mt-7 mx-auto w-3/5 md:w-1/5">
            <Button
              variant="outline"
              label="Sign in"
              className="max-w-full"
              onClick={() => onClose()}
            />
            <Button
              label="Sign Up"
              className="max-w-full"
              onClick={() => onClose()}
            />
          </div>
        </Drawer>
      </header>
    </ConfigProvider>
  );
}

export default Header;
