"use client";
import type { FormItemProps } from "antd";
import { Button, Form, Input } from "antd";
import React from "react";

function CreateAccount(): JSX.Element {
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
    ></Form>
  );
}

export default CreateAccount;
