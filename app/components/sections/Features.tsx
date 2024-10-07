import { FEATURES } from "@/app/utils/data";
import LaptopHero from '@/public/laptop.svg';
import FeatureBg from "@/public/feature.png";
import Image from "next/image";
import React from "react";
import { Heading3, Paragraph, Small } from "../typography/Typography";
import Section from "./Section";

function Features(): JSX.Element {
  return (
    <Section>
      <div className="flex flex-col-reverse space-y-0 lg:flex lg:flex-row lg:space-x-8 lg:items-center xl:flex xl:flex-row xl:space-x-8 xl:items-center">
        <div className="w-full md:w-4/5 md:mx-auto lg:mx-auto xl:mx-auto lg:w-1/2 xl:w-1/2">
          <Image src={LaptopHero} alt="hero" className="ms-1" />
        </div>
        <div className="flex flex-col space-y-5 w-full md:w-4/5 md:mx-auto lg:mx-0 xl:mx-0 lg:w-1/2 xl:w-1/2">
          <div className="flex flex-col">
            <Small
              content="Features"
              className="text-OWANBE_PRY text-lg tracking-wider uppercase"
            />
            <Heading3 content="Create Event, Share the Joy" className="w-4/4" />
          </div>
          <div className="flex flex-col space-y-4">
            {FEATURES.map((i, index: any) => {
              return (
                <div className="flex flex-col space-y-3" key={index}>
                  <div className="flex flex-row items-center space-x-3">
                    <Image src={i.icon} alt="icon" />
                    <Small content={i.title} className="text-lg" />
                  </div>
                  <Paragraph
                    content={i.content}
                    className="w-full md:w-full lg:w-[86%] xl:w-[86%] text-OWANBE_ASH text-lg"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Features;
