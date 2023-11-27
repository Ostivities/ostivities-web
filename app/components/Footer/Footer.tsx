import Mail from "@/public/envelope.svg";
import OwanbeLogo from "@/public/ownabe.svg";
import Phone from "@/public/phone.svg";
import Image from "next/image";
import React from "react";
import { Heading5, Paragraph, Small } from "../typography/Typography";

function Footer(): JSX.Element {
  return (
    <footer className="overflow-hidden mt-3">
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-3">
          <div className="grid grid-cols-4">
            {/* 1 */}
            <div className="flex flex-col space-y-3">
              <Image src={OwanbeLogo} alt="Owanbe Logo" />
              <div className="flex flex-row items-center space-x-3">
                <Image src={Mail} alt="icon" />
                <Small
                  content={"help@Owannbe.com"}
                  className="text-lg text-black"
                />
              </div>

              <div className="flex flex-row items-center space-x-3">
                <Image src={Phone} alt="icon" />
                <Small
                  content={"+1 234 456 678 89"}
                  className="text-lg text-black"
                />
              </div>
            </div>
            {/* 2 */}
            <div className="flex flex-col space-y-3">
              <Heading5 content="Legal" className="" />
            </div>
            {/* 3 */}
            <div>
              <Heading5 content="Support" className="" />
            </div>
            {/* 4 */}
            <div>
              <Heading5 content="NewsLetter" className="" />
            </div>
          </div>
          <div className="flex flex-row items-center justify-end space-x-7"></div>
        </div>
        <hr className="hor-rule" />
        <div className="footer-bottom py-3">
          <Paragraph
            className="text-center"
            content="Copyright 2023 - Ówànbè all rights reserved"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
