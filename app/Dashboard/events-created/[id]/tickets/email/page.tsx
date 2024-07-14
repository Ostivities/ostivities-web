"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const EventTicketsEmail = () => {
  const [value, setValue] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        quote: function (this: any, value: string) {
          if (value === "under" || value === "over") {
            this.quill.format("blockquote", value);
          }
        },
      },
    },
  };

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Heading5 className="" content={"Customize ticket e-mail"} />

        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <Paragraph
            className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Message for ticket e-mail"}
            styles={{ fontWeight: "normal !important" }}
          />

          <div className="w-11/12 mb-14">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="rounded-br-lg rounded-bl-lg h-60"
              style={{
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
              modules={modules}
            />
          </div>
          <Space
            direction="horizontal"
            size={"large"}
            style={{ width: "100%" }}
            align="center"
            className="space-x-6"
          >
            <Space
              direction="horizontal"
              size={"large"}
              style={{ width: "100%" }}
            >
              <Paragraph
                className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
                content={"Enter Address to send test Message"}
                styles={{ fontWeight: "normal !important" }}
              />
              <Input
                placeholder="Enter address"
                type="email"
                style={{ width: "100%" }}
              />
            </Space>
            <div className="">
              <Button
                type={"primary"}
                size="middle"
                className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-32 rounded-2xl`}
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={() => {}}
              >
                Send test
              </Button>
            </div>
          </Space>
        </Space>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventTicketsEmail;
