"use client";
import { useFormContext } from "@/app/contexts/form-context/FormContext";
import { Steps } from "antd";
import React, { useState } from "react";

function Steppers(): JSX.Element {
  const { formState } = useFormContext();

  return (
    <Steps
      progressDot
      responsive
      current={formState?.stage}
      direction="horizontal"
      labelPlacement="vertical"
      items={[
        {
          title: "Event Details",
          description: "",
          className: "font-BricolageGrotesqueRegular",
        },
        {
          title: "Event Image",
          description: "",
          className: "font-BricolageGrotesqueRegular",
        },
        {
          title: "Tickets Creation",
          description: "",
          className: "font-BricolageGrotesqueRegular",
        },
      ]}
      size="small"
    />
  );
}

export default Steppers;
