"use client";
import { ADVANTAGES_TWO } from "@/app/utils/data";
import AdvantagesBg from "@/public/adv2.png";
import Image from "next/image";
import React from "react";
import { Heading3, Paragraph, Small } from "../typography/Typography";
import Section from "./Section";
import { motion } from "framer-motion";

function AdvantagesTwo(): JSX.Element {
  return (
    <Section>
      <div className="flex flex-col-reverse space-y-8 lg:flex lg:flex-row lg:space-x-8 lg:items-center xl:flex xl:flex-row xl:space-x-8 xl:items-center">
        {/* Image Section with Fade-In Animation */}
        <motion.div
          className="w-full pt-8 md:pt-8 lg:pt-0 xl:pt-0 md:w-4/5 md:mx-auto lg:mx-auto xl:mx-auto lg:w-1/2 xl:w-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={AdvantagesBg}
            alt="hero"
            className="ms-0 md:ms-0 lg:ms-1 xl:ms-1 pt-8 md:pt-8 lg:pt-0 xl:pt-0"
          />
        </motion.div>

        {/* Content Section with Fade-In Animation */}
        <motion.div
          className="flex flex-col space-y-5 w-full md:w-4/5 md:mx-auto lg:mx-0 xl:mx-0 lg:w-1/2 xl:w-1/2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother transition
        >
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
                    className="w-full md:w-full lg:w-[86%] xl:w-[86%] text-OWANBE_ASH text-lg"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export default AdvantagesTwo;
