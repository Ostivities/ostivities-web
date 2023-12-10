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
      direction="vertical"
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
