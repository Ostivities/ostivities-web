import React from "react";
import Accordion from "../Accordion/Accordion";
import { Heading3, Small } from "../typography/Typography";
import Section from "./Section";

function Faqs(): JSX.Element {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <Section>
      <div className="flex flex-col space-y-5" style={{ height: "700px" }}>
        <div className="flex flex-col w-1/3">
          <Small
            content="FAQ"
            className="text-OWANBE_PRY text-lg tracking-wider uppercase"
          />
          <Heading3
            content="Frequently asked questions"
            className="w-3/4 capitalize"
          />
        </div>

        <Accordion />
      </div>
    </Section>
  );
}

export default Faqs;
