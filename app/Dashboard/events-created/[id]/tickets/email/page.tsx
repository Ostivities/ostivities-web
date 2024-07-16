"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Button, Input, Space } from "antd";
import React, { useState } from "react";

const EventTicketsEmail = () => {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  console.log(editorContent, "Editor content");

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Heading5 className="" content={"Customize ticket e-mail"} />

        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <Paragraph
            className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Enter your ticket e-mail message"}
            styles={{ fontWeight: "normal !important" }}
          />

          <div className="w-11/12 mb-14">
            <EmailEditor
              initialValue="<p>Write your email here!</p>"
              onChange={handleEditorChange}
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
                style={{ width: "120%" }}
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
