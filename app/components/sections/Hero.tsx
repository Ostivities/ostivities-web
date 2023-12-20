import LaptopHero from "@/public/laptop.png";
import Z from "@/public/z.svg";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
import { Heading3, Paragraph } from "../typography/Typography";
import Section from "./Section";

function Hero(): JSX.Element {
  return (
    <Section>
      <div className="flex flex-col space-y-3 pt-5 mt-3 md:pt-5 md:mt-3 lg:pt-0 lg:mt-0 xl:pt-0 xl:mt-0">
        <div className="flex flex-col space-y-8 md:flex md:flex-col md:space-y-8 lg:flex lg:flex-row lg:space-x-8 lg:items-center xl:flex xl:flex-row xl:space-x-8 xl:items-center">
          <div className="flex flex-col w-full space-y-5 mx-0 md:flex md:flex-col md:w-4/5 md:mx-auto lg:mx-0 xl:mx-0 lg:flex lg:flex-col lg:space-y-5 lg:w-1/2 xl:flex xl:flex-col xl:space-y-5 xl:w-1/2">
            <Heading3
              content="Celebrate, Connect and Create Memories"
              className="w-full text-center lg:text-left xl:text-left md:w-full md:text-center lg:w-3/4 xl:w-3/4"
            />
            <Paragraph
              content="Embark on a journey with Ostivities — where celebrations thrive! Connect, discover, and create lasting memories. Join now for a vibrant experience!"
              className="w-full md:w-full text-center md:text-center lg:text-left xl:text-left lg:w-[86%] xl:w-[86%] text-OWANBE_ASH text-lg"
            />
            <Button className="get-started mx-auto md:mx-auto lg:mx-0 xl:mx-0 active:overflow-hidden">
              <div className="flex items-center justify-center space-x-2">
                <span>Get started</span>
                <ArrowRightOutlined />
              </div>
            </Button>
          </div>
          <div className="w-full md:w-full lg:w-1/2 xl:w-1/2">
            <Image src={LaptopHero} alt="hero" className="ms-1" />
          </div>
        </div>

        <div className="hidden md:hidden lg:block xl:block lg:w-1/2 xl:w-1/2 text-left pt-8 md:pt-8 lg:pt-0 xl:pt-0">
          <Image
            src={Z}
            alt="hero"
            className="ms-0 pt-8 md:pt-8 lg:pt-0 xl:pt-0"
          />
        </div>
      </div>
    </Section>
  );
}

export default Hero;

