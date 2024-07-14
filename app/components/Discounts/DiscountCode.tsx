import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";
import { Heading5, Label } from "../typography/Typography";

interface FieldType {}

const DiscountCode = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  return (
    <Form<FieldType>
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className="w-full flex flex-col space-y-6"
    >
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <Heading5 className="" content={"Discount Code"} />
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item<FieldType>
              label={<Label content="Discount code" />}
              name="discountCode"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
            >
              <Input placeholder="Enter ticket name" />
            </Form.Item>

            <Form.Item<FieldType>
              label={<Label content="Discount Value" />}
              name="discountValue"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
            >
              <InputNumber
                placeholder="Enter group price"
                style={{ width: "100%" }}
                min={0}
                // onChange={handleGroupPriceChange}
                formatter={(value) =>
                  `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value?.replace(/\₦\s?|(,*)/g, "") as any}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<Label content="Ticket Applicable" />}
              name="ticketApplicable"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
            >
              <Select placeholder="Select type">
                <Select.Option value={2}>Couple</Select.Option>
                <Select.Option value={3}>Trio</Select.Option>
                <Select.Option value={4}>Quads</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Space>
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <Heading5 className="" content={"Usage Limit"} />
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item<FieldType>
              label={<Label content="Usage Limit" />}
              name="usageLimit"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
            >
              <Select placeholder="Select type">
                <Select.Option value={2}>Couple</Select.Option>
                <Select.Option value={3}>Trio</Select.Option>
                <Select.Option value={4}>Quads</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item<FieldType>
              label={<Label content="Start Date & Time" />}
              name="startDate"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: "100%", height: "33px" }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label={<Label content="End Date & Time" />}
              name="endDate"
              rules={[
                { required: true, message: "Please input your ticket name!" },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: "100%", height: "33px" }}
              />
            </Form.Item>
          </div>
        </Space>
      </Space>

      <Space
        direction="horizontal"
        size={"large"}
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        className="pt-5"
      >
        <Form.Item>
          <Button
            type="default"
            htmlType="button"
            size={"large"}
            className={`font-BricolageGrotesqueSemiBold continue  cursor-pointer font-bold w-48 rounded-2xl`}
            style={{
              borderRadius: "16px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={toggleDiscount}
          >
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
          >
            Save
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default DiscountCode;
