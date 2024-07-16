"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Button, Form, FormProps, Input, Select, Space } from "antd";
import React, { useState } from "react";

interface FieldType {}

const EventsGuestListEmail = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="horizontal" align="start">
          <Heading5 className="" content={"Email Guestlist"} />
        </Space>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col space-y-6 w-full pb-4 mb-6"
          form={form}
        >
          <div className="grid grid-cols-2 gap-x-12">
            <Form.Item<FieldType>
              label="Sender Name"
              name="senderName"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter sender name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Reply To"
              name="senderName"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter reply email" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Recipients"
              name="recipients"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Select placeholder="Select ticket type">
                <Select.Option value="all">All attendee</Select.Option>
                <Select.Option value="all">Guestlist by ticket</Select.Option>
                <Select.Option value="all">Selected attendee</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item<FieldType>
              label="Email Subject"
              name="subject"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter email subject" />
            </Form.Item>
          </div>

          <div className="mb-4 pb-12 w-full">
            <EmailEditor
              initialValue="<p>Write your email here!</p>"
              onChange={handleEditorChange}
            />
          </div>

          <div className="pt-4 flex flex-row">
            <div className="flex flex-row items-center space-x-3 w-1/2">
              <Paragraph
                className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
                content={"Enter Address to send test Message"}
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
          </div>

          <div className="mx-auto pt-8 pb-8">
            <Button
              type="primary"
              size={"large"}
              htmlType="button"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles w-44"
            >
              Send
            </Button>
          </div>
        </Form>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventsGuestListEmail;
