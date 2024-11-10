"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Button, Input, message, Space } from "antd";
import router from "next/router";
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

          <div className="mb-4 pb-12 w-full">
            <EmailEditor
              initialValue="<p>Write your email here!</p>"
              onChange={handleEditorChange}
             />
          </div>

          <div className="pt-3 flex flex-row">
            <div className="flex flex-row items-center space-x-6 w-1/2">
              <Paragraph
                className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
                content={"Enter Email Address to send test Message"}
                styles={{ fontWeight: "normal !important" }}
              />
              <Input
                placeholder="Enter address"
                type="email"
                style={{ width: "50%" }}
              />
            </div>
            <div className="">
              <Button
                type={"primary"}
                size="middle"
                className={`font-BricolageGrotesqueSemiBold continue font-bold w-32 rounded-2xl`}
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={() => message.success('Test email has been sent successfully')}
              >
                Send test
              </Button>
            </div>
          </div>

          <div className="flex justify-center pt-8 pb-8">
  <Button
    type="primary"
    size="large"
    htmlType="button"
    className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
    onClick={() => message.success('Ticket email has been initiated successfully')}
  >
    Initiate
  </Button>
</div>
          </Space>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventTicketsEmail;