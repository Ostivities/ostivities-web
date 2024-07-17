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
import { Heading5, Label } from "../typography/Typography"; // Ensure Label component is correctly imported

interface FieldType {}

const DiscountCode = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();
  const [form] = Form.useForm();
  const [ticketApplicable, setTicketApplicable] = useState("All Tickets");

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  const handleTicketApplicableChange = (value: string) => {
    setTicketApplicable(value);
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className="w-full flex flex-col space-y-6"
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Heading5 content="Discount Code" />
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label={<Label content="Discount code" />} // Correct usage of Label component
              name="discountCode"
              rules={[
                { required: true, message: "Please input the discount code!" },
              ]}
            >
              <Input placeholder="Enter discount code" />
            </Form.Item>

            <Form.Item
              label={<Label content="Discount Value" />} // Correct usage of Label component
              name="discountValue"
              rules={[
                { required: true, message: "Please input the discount value!" },
              ]}
            >
              <InputNumber
                placeholder="Enter discount value"
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value?.replace(/\₦\s?|(,*)/g, "") as any}
              />
            </Form.Item>

            <Form.Item
              label={<Label content="Ticket Applicable" />} // Correct usage of Label component
              name="ticketApplicable"
              rules={[
                {
                  required: true,
                  message: "Please select the ticket applicable!",
                },
              ]}
            >
              <Select
                placeholder="Select ticket applicable"
                onChange={handleTicketApplicableChange}
              >
                <Select.Option value="All Tickets">All Tickets</Select.Option>
                <Select.Option value="Individual Ticket">
                  Individual Ticket
                </Select.Option>
              </Select>
            </Form.Item>

            {ticketApplicable === "Individual Ticket" && (
              <Form.Item
                label={<Label content="Select Ticket" />} // Correct usage of Label component
                name="selectTicket"
                rules={[
                  { required: true, message: "Please select the ticket!" },
                ]}
              >
                <Select placeholder="Select ticket">
                  {/* Map through your created tickets here */}
                  <Select.Option value="Ticket 1">Ticket 1</Select.Option>
                  <Select.Option value="Ticket 2">Ticket 2</Select.Option>
                  <Select.Option value="Ticket 3">Ticket 3</Select.Option>
                </Select>
              </Form.Item>
            )}
          </div>
        </Space>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Heading5 content="Usage Limit" />
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label={<Label content="Usage Limit" />} // Correct usage of Label component
              name="usageLimit"
              rules={[
                { required: true, message: "Please select the usage limit!" },
              ]}
            >
              <Select placeholder="Select usage limit">
                <Select.Option value="Unlimited">Unlimited</Select.Option>
                <Select.Option value="Useable Once">Useable Once</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<Label content="End Date & Time" />} // Correct usage of Label component
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please input the end date and time!",
                },
              ]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: "100%", height: "33px" }}
              />
            </Form.Item>

            <Form.Item
              label={<Label content="Start Date & Time" />} // Correct usage of Label component
              name="startDate"
              rules={[
                {
                  required: true,
                  message: "Please input the start date and time!",
                },
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
        size="large"
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
            size="large"
            className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold w-48 rounded-2xl"
            style={{
              borderRadius: "16px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() => toggleDiscount("Discount")}
          >
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            htmlType="button"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
            onClick={() => toggleDiscount("Discount_Record")}
          >
            Create
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default DiscountCode;
