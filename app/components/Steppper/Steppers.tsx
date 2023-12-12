"use client";
import { useFormContext } from "@/app/contexts/form-context/FormContext";
import EditIcon from "@/public/Edit.svg";
import ImageIcon from "@/public/Image.svg";
import TicketStep from "@/public/TicketStep.svg";
import { EditOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "../typography/Typography";

function Steppers(): JSX.Element {
  const { formState } = useFormContext();

  return (
    <Steps
      responsive
      current={formState?.stage}
      direction="horizontal"
      labelPlacement="vertical"
      className="mx-auto"
      style={{ width: "400px" }}
      items={[
        {
          title: <Label content="Event Details" />,
          description: "",
          className: "font-BricolageGrotesqueRegular",
          icon: (
            <Image
              src={EditIcon}
              alt="event image"
              style={{
                width: "33px",
                height: "33px",
                background: formState?.stage === 0 ? "#E20000" : "#fff",
                borderRadius: "100%",
                padding: "7px",
              }}
            />
          ),
        },
        {
          title: <Label content="Event Image" />,
          description: "",
          className: "font-BricolageGrotesqueRegular",
          icon: (
            <Image
              src={ImageIcon}
              alt="event image"
              style={{
                width: "33px",
                height: "33px",
                background: formState?.stage === 1 ? "#E20000" : "#fff",
                borderRadius: "100%",
                padding: "3px",
              }}
            />
          ),
        },
        {
          title: <Label content="Tickets Creation" />,
          description: "",
          className: "font-BricolageGrotesqueRegular",
          icon: (
            <Image
              src={TicketStep}
              alt="event image"
              style={{
                width: "33px",
                height: "33px",
                background: formState?.stage === 2 ? "#E20000" : "#fff",
                borderRadius: "100%",
              }}
            />
          ),
        },
      ]}
      size="default"
    />
  );
}

export default Steppers;
