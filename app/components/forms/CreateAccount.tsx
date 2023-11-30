"use client";
import { ACCOUNT_TYPE } from "@/app/utils/enums";
import type { FormItemProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";

function CreateAccount(): JSX.Element {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [val, setval] = useState<string>("");

  const onFinish = (value: object) => {
    console.log(value);
  };

  console.log(val, "vv");
  return (
    <Form
      name="validateOnly"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      <Form.Item
        label="Choose an Account Type"
        style={{ fontFamily: "BricolageGrotesqueRegular" }}
        className="font-BricolageGrotesqueRegular"
        help={
          !val ? null : (
            <span className="font-BricolageGrotesqueLight">
              {val === ACCOUNT_TYPE.PERSONAL
                ? "Are you an individual looking to sell tickets? This account type is tailored for you."
                : "Are you a registered business looking to sell tickets? This account type is tailored for you."}
            </span>
          )
        }
      >
        <Form.Item
          name="accountType"
          noStyle
          rules={[
            {
              required: true,
              message: "Please select an account type",
            },
          ]}
          //@ts-ignore
          getValueProps={(value: any) => setval(value)}
        >
          <Select placeholder="Select">
            <Option value={ACCOUNT_TYPE.PERSONAL}>Personal</Option>
            <Option value={ACCOUNT_TYPE.ORGANISATION}>Organization</Option>
          </Select>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}

export default CreateAccount;
