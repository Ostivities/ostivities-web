import { LEGAL, SUPPORT } from "@/app/utils/data";
import Instagram from "@/public/Instagram.svg";
import Linkedln from "@/public/LinkedIn.svg";
import Twitter from "@/public/X.svg";
import Mail from "@/public/envelope.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import Phone from "@/public/phone.svg";
import { Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NewsLetter from "../newsletter/NewsLetter";
import { Heading5, Paragraph, Small } from "../typography/Typography";

function Footer(): JSX.Element {
  return (
    <footer className="overflow-hidden mt-3">
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-5 py-4 w-4/5 px-6 md:px-0 xl:px-0 lg:px-0 md:w-4/5 md:mx-auto lg:w-full xl:w-full">
          <div className="grid grid-cols-1 gap-12 md:gap-10 lg:gap-0 xl:gap-0 md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 pb-3">
            {/* 1 */}
            <div className="flex flex-col space-y-3">
              <Image src={OwanbeLogo} alt="Owanbe Logo" />
              <div className="flex flex-row items-center space-x-3">
                <Image src={Mail} alt="icon" />
                <Small
                  content={"Hello@Ostivities.com"}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />
              </div>

              <div className="flex flex-row items-center space-x-3">
                <Image src={Phone} alt="icon" />
                <Small
                  content={"+1 234 456 678 89"}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />
              </div>
            </div>
            {/* 2 */}
            <div className="flex flex-col space-y-3">
              <Heading5 content="Legal" className="" />
              {LEGAL.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 3 */}
            <div className="flex flex-col space-y-3">
              <Heading5 content="Support" className="" />
              {SUPPORT.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 4 */}
            <div className="flex flex-col space-y-3">
              <Heading5 content="NewsLetter" className="" />
              <Small
                content={"Stay up to date"}
                className="text-sm lg:text-lg xl:text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
              />
              <NewsLetter />
            </div>
          </div>
          <div className="flex flex-row items-center justify-start md:justify-end lg:justify-end xl:justify-end">
            <Space direction="horizontal" size={24}>
              <Image
                src={Instagram}
                alt="linkedln"
                className="cursor-pointer"
              />
              <Image src={Twitter} alt="linkedln" className="cursor-pointer" />
              <Image src={Linkedln} alt="linkedln" className="cursor-pointer" />
            </Space>
          </div>
        </div>
        <hr className="hor-rule" />
        <div className="footer-bottom pt-5">
          <Paragraph
            className="text-center"
            content="Copyright 2024 - Ostivities all rights reserved "
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
