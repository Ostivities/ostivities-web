"use client";
import { Heading3, Paragraph } from "@/app/components/typography/Typography";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function ForgotPasswordForm(): JSX.Element {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (value: object) => {
    console.log(value);
  };
  return (
    <Form
      name="validateOnly"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      <Form.Item
        label="Email Address"
        style={{ fontFamily: "BricolageGrotesqueRegular" }}
        className="font-BricolageGrotesqueRegular"
      >
        <Form.Item
          noStyle
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="placeholder:font-BricolageGrotesqueRegular"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base"
          style={{
            background: "#E20000",
            borderRadius: "20px",
            width: "100%",
            height: "51px",
          }}
        >
          Continue
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswordForm;
