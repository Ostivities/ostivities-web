"use client";
import { LEGAL, NEWSLETTER, SUPPORT } from "@/app/utils/data";
import Instagram from "@/public/Instagram.svg";
import Linkedln from "@/public/LinkedIn.svg";
import Twitter from "@/public/X.svg";
import Whatsapp from "@/public/WhatsApp.svg";
import Mail from "@/public/envelope.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import Phone from "@/public/phone.svg";
import { Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heading5, Paragraph, Small } from "../typography/Typography";



function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden mt-3">
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-5 py-4 w-4/5 px-6 md:px-0 xl:px-0 lg:px-0 md:w-4/5 md:mx-auto lg:w-full xl:w-full">
          <div className="grid grid-cols-1 gap-12 md:gap-10 lg:gap-0 xl:gap-0 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 pb-3">
            {/* 1 */}
            <div className="flex flex-col space-y-4">
              <Image
                src={OwanbeLogo}
                alt="Ostivities Logo"
                style={{ height: "58px" }}
                className="w-[170px]"
              />
              <div className="flex flex-row items-center space-x-5">
                <Image src={Mail} alt="icon" />
                <Small
                  content={
                    <a href="mailto:hello&#64;ostivities.com" style={{ color: "#383A47", textDecoration: "none" }}>
                      hello&#64;ostivities.com
                    </a>
                  }
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />

              </div>

              <div className="flex flex-row items-center space-x-3">
                <Image src={Phone} alt="icon" />
                <Small
                  content={"+234 810 1218 257"}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />
              </div>
            </div>
          
            {/* 3 */}
            <div className="flex flex-col space-y-3">
              <Heading5 content="Support" className="" />
              {SUPPORT.map((item, index) => (
                <Link
                  key={index} // Changed to index for uniqueness
                  href={item.link}
                  target={item.target}
                  rel={item.rel}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 4 */}
            <div className="flex flex-col space-y-3">
              <Heading5 content="Newsletter" className="" />
              {NEWSLETTER.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target={item.target}
                  rel={item.rel}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
              
              <a
                href="https://www.producthunt.com/products/ostivities?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-ostivities"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=599681&theme=light"
                  alt="Ostivities - Revolutionizing&#0032;Social&#0032;Event&#0032;Management&#0032; | Product Hunt"
                  style={{ width: '250px', height: '54px' }}
                  width="250"
                  height="54"
                />
              </a>
              {/* <a href="#"
                onClick={() => window.open('https://www.sitelock.com/verify.php?site=ostivities.com', 'SiteLock', 'width=600,height=600,left=160,top=170')}>
                <img
                  className="img-fluid"
                  alt="SiteLock"
                  title="SiteLock"
                  src="https://shield.sitelock.com/shield/ostivities.com" />
                  </a> */}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start md:justify-end lg:justify-end xl:justify-end">
            <Space direction="horizontal" size={24}>
              <a href="https://www.instagram.com/ostivities" target="_blank" rel="noopener noreferrer">
                <Image
                  src={Instagram}
                  alt="Instagram"
                  className="cursor-pointer"
                />
              </a>
              <a href="https://x.com/Ostivities" target="_blank" rel="noopener noreferrer">
                <Image
                  src={Twitter}
                  alt="Twitter"
                  className="cursor-pointer"
                />
              </a>
              <a href="https://www.linkedin.com/company/ostivities" target="_blank" rel="noopener noreferrer">
                <Image
                  src={Linkedln}
                  alt="LinkedIn"
                  className="cursor-pointer"
                />
              </a>
              <a href="https://whatsapp.com/channel/0029ValuXFsC6Zvq6enUQe1z" target="_blank" rel="noopener noreferrer">
                <Image
                  src={Whatsapp}
                  alt="Whatsapp"
                  className="cursor-pointer"
                />

              </a>
            </Space>
          </div>
        </div>
        <hr className="hor-rule" />
        <div className="footer-bottom pt-5">
  {/* Footer Wrapper */}
  <div className="flex flex-col md:flex-row justify-between items-start md:space-y-0 space-y-6">
    {/* Copyright Section */}
    <div className="order-2 md:order-1 text-left mt-8 md:mt-0">
    <Paragraph
  content={`Copyright © ${currentYear}. Ostivities Technology Limited. All rights reserved.`}
  className="text-center md:text-left text-OWANBE_H4 font-light font-BricolageGrotesqueLight text-[14px] md:text-base" // Adjusted alignment for mobile
/>

    </div>

    {/* Legal Links Section */}
    <div className="order-1 md:order-2 flex flex-wrap md:flex-row md:space-x-8 space-x-6 text-left md:mr-16">
      {LEGAL.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          target={item.target}
          rel={item.rel}
          className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
</div>

</div>
    </footer>
  );
}

export default Footer;