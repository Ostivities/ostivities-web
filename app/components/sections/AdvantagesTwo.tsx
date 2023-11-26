import { ADVANTAGES_TWO } from "@/app/utils/data";
import AdvantagesBg from "@/public/adv2.png";
import Image from "next/image";
import React from "react";
import { Heading3, Paragraph, Small } from "../typography/Typography";
import Section from "./Section";

function AdvantagesTwo(): JSX.Element {
  return (
    <Section>
      <div className="flex flex-row space-x-8 items-center" hidden>
        <div className="w-1/2">
          <Image src={AdvantagesBg} alt="hero" className="ms-1" />
        </div>

        <div className="flex flex-col space-y-5 w-1/2">
          <div className="flex flex-col space-y-4">
            {ADVANTAGES_TWO.map((i, index: any) => {
              return (
                <div className="flex flex-col space-y-3" key={index}>
                  <div className="flex flex-row items-center space-x-3">
                    <Image src={i.icon} alt="icon" />
                    <Small content={i.title} className="text-lg" />
                  </div>
                  <Paragraph
                    content={i.content}
                    className="w-[86%] text-OWANBE_ASH text-lg"
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

export default AdvantagesTwo;
