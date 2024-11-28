"use client";
import React from "react";
import Accordion from "../Accordion/Accordion";
import { Heading3, Small } from "../typography/Typography";
import Section from "./Section";
import { motion } from "framer-motion";

function Faqs(): JSX.Element {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Section>
      <div
        className="flex flex-col space-y-5 md:w-4/5 lg:w-full xl:w-full md:mx-auto lg:mx-0 xl:mx-0 h-auto md:h-auto lg:h-[700px] xl:h-[700px]"
      >
        {/* Adjust this div to allow full width */}
        <div className="flex flex-col w-full md:w-full lg:w-1/3 xl:w-1/3">
        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother animation
          >
          <Small
            content="FAQ"
            className="text-OWANBE_PRY text-lg tracking-wider uppercase"
          />
          
          <Heading3
            content="Frequently asked questions"
            className="w-full md:w-full capitalize"
          />
          </motion.div>
        </div>
        <Accordion />
      </div>
    </Section>
  );
}

export default Faqs;
