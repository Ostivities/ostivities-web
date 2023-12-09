"use client";
import { Steps } from "antd";
import React, { useState } from "react";

function Steppers(): JSX.Element {
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  return (
    <Steps
      progressDot
      responsive
      current={current}
      direction="vertical"
      onChange={onChange}
      items={[
        {
          title: "Details",
          description: "",
          className: "font-BricolageGrotesqueRegular",
        },
        {
          title: "Appearance",
          description: "",
          className: "font-BricolageGrotesqueRegular",
        },
        {
          title: "Tickets",
          description: "",
          className: "font-BricolageGrotesqueRegular",
        },
      ]}
      size="small"
    />
  );
}

export default Steppers;
