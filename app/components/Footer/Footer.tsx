"use client";
import { LEGAL, NEWSLETTER, SOCIALS, SUPPORT } from "@/app/utils/data";
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
import { Paragraph, Small } from "../typography/Typography";
import Script from "next/script";



function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden mt-3">
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-5 py-4 w-4/5 px-6 md:px-0 xl:px-0 lg:px-0 md:w-4/5 md:mx-auto lg:w-full xl:w-full">
          <div className="grid grid-cols-1 gap-12 md:gap-10 lg:gap-0 xl:gap-0 md:grid md:grid-cols-2 lg:grid lg:grid-cols-5 xl:grid xl:grid-cols-5 pb-3">
            {/* 1 */}
            <div className="flex flex-col space-y-3">
              <Image
                src={OwanbeLogo}
                alt=""
                style={{ height: "52px" }}
                className="w-[170px]"
              />
              <div className="flex flex-row items-center space-x-3 ml-3">
                <Image src={Mail} alt="icon" width={20}
                  height={20} />
                <Small
                  content={
                    <a href="mailto:hello&#64;ostivities.com" style={{ color: "#383A47", textDecoration: "none" }}>
                      hello&#64;ostivities.com
                    </a>
                  }
                  className="text-sm lg:text-base xl:text-base text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />

              </div>
              <div className="flex flex-row items-center space-x-3 ml-3">
                <Image src={Phone} alt="icon" width={24}
                  height={24} />
                <Small
                  content={"+234 810 1218 257"}
                  className="text-sm lg:text-base xl:text-base text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                />
              </div>
              <div className="flex flex-row items-center space-x-3 ml-3">
                <a
                  href="https://www.producthunt.com/posts/ostivities?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ostivities"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=480097&theme=light&t=1736447392470"
                    alt="Ostivities - Revolutionizing&#0032;Social&#0032;Event&#0032;Management&#0032; | Product Hunt"
                    style={{ width: '200px', height: '54px' }}
                    width="250"
                    height="54"
                  />
                </a>
              </div>

            </div>
            {/* 2 */}
            <div className="flex flex-col space-y-2">
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: '500', // Medium weight
                  fontSize: '18px',
                  lineHeight: '1.5',
                }}
              >
                Legal
              </h3>

              {LEGAL.map((item, index) => (
                <Link
                  key={index} // Changed to index for uniqueness
                  href={item.link}
                  target={item.target}
                  rel={item.rel}
                  className="text-sm lg:text-base xl:text-base text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 3 */}
            <div className="flex flex-col space-y-2">
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: '500', // Medium weight
                  fontSize: '18px',
                  lineHeight: '1.5',
                }}
              >
                Support
              </h3>

              {SUPPORT.map((item, index) => (
                <Link
                  key={index} // Changed to index for uniqueness
                  href={item.link}
                  target={item.target}
                  rel={item.rel}
                  className="text-sm lg:text-base xl:text-base text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 4 */}
            <div className="flex flex-col space-y-2">
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: '500', // Medium weight
                  fontSize: '18px',
                  lineHeight: '1.5',
                }}
              >
                Connect with us
              </h3>

              {SOCIALS.map((item, index) => (
                <Link
                  key={index} // Changed to index for uniqueness
                  href={item.link}
                  target={item.target}
                  rel={item.rel}
                  className="text-sm lg:text-base xl:text-base text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* 5 */}
            <div className="flex flex-col space-y-2">
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: '500', // Medium weight
                  fontSize: '18px',
                  lineHeight: '1.5',
                }}
              >
                Stay Updated
              </h3>

              <Small
                content={"Subscribe to our features platform to keep yourself updated about us."}
                className="text-sm lg:text-base xl:text-base text-OWANBE_H4 font-light font-BricolageGrotesqueLight"
              />
              <div id="custom-substack-embed" className="mt-5">
                <Script
                  id="substack-widget"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
          window.CustomSubstackWidget = {
            substackUrl: "ostivities.substack.com",
            placeholder: "example@gmail.com",
            buttonText: "Subscribe",
            theme: "custom",
            colors: {
      primary: "#E20000",
      input: "#FFFFFF",
      email: "#000000",
      text: "#FFFFFF",
    },
          };
        `,
                  }}
                />
                <Script
                  src="https://substackapi.com/widget.js"
                  strategy="afterInteractive"
                />
              </div>
              {/* <a href="#"
                onClick={() => window.open('https://www.sitelock.com/verify.php?site=ostivities.com', 'SiteLock', 'width=600,height=600,left=160,top=170')}>
                <img
                  className="img-fluid"
                  alt="SiteLock"
                  title="SiteLock"
                  src="https://shield.sitelock.com/shield/ostivities.com" /></a> */}

            </div>
          </div>
        </div>
        <hr className="hor-rule" />
        <div className="footer-bottom pt-5 flex flex-row justify-between items-center w-full">
          <Paragraph
            content={`© ${currentYear} Ostivities Technology Limited. All rights reserved`}
            className="text-start text-OWANBE_H4 font-light font-BricolageGrotesqueLight text-[13px] md:text-sm"
          // Align text to the start (left)
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;