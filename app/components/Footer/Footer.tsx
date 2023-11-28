import { LEGAL, SUPPORT } from "@/app/utils/data";
import Mail from "@/public/envelope.svg";
import OwanbeLogo from "@/public/owanbe.svg";
import Phone from "@/public/phone.svg";
import { Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heading5, Paragraph, Small } from "../typography/Typography";

function Footer(): JSX.Element {
  return (
    <footer className="overflow-hidden mt-3">
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-3 py-4">
          <div className="grid grid-cols-4 pb-3">
            {/* 1 */}
            <div className="flex flex-col space-y-3">
              <Image src={OwanbeLogo} alt="Owanbe Logo" />
              <div className="flex flex-row items-center space-x-3">
                <Image src={Mail} alt="icon" />
                <Small
                  content={"Hello@Ostivities.com"}
                  className="text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />
              </div>

              <div className="flex flex-row items-center space-x-3">
                <Image src={Phone} alt="icon" />
                <Small
                  content={"+1 234 456 678 89"}
                  className="text-lg  text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
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
                  className="text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
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
                  className="text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
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
                className="text-lg text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-end space-x-7">
            <Space></Space>
          </div>
        </div>
        <hr className="hor-rule" />
        <div className="footer-bottom py-3">
          <Paragraph
            className="text-center py-3"
            content="Copyright 2023 - Ostivities all rights reserved "
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
