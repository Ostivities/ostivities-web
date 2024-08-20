import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";

interface FieldType {}

const SingleTicket = (): JSX.Element => {
  const { TextArea } = Input;
  const { Option } = Select;

  const [ticketType, setTicketType] = useState<string>("paid");
  const [ticketStockValue, setTicketStockValue] = useState<string>("");

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
  };

  const handleStockChange = (value: string) => {
    setTicketStockValue(value);
  };

  const handleTicketTypeChange = (value: string) => {
    setTicketType(value);
  };

  const prefixSelector = (
    <Select defaultValue="unlimited" onChange={handleStockChange}>
      <Option value="limited">Limited</Option>
      <Option value="unlimited">Unlimited</Option>
    </Select>
  );

  return (
    <Form<FieldType>
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="Ticket type"
        name="ticketType"
        rules={[{ required: true, message: "Please select your ticket type!" }]}
        style={{ marginBottom: '8px' }}
      >
        <Select placeholder="Select ticket type" onChange={handleTicketTypeChange}>
          <Option value="free">Free</Option>
          <Option value="paid">Paid</Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Ticket name"
        name="ticketName"
        rules={[{ required: true, message: "Please input your ticket name!" }]}
        style={{ marginBottom: '8px' }}
      >
        <Input placeholder="Enter ticket name" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Ticket stock" 
        name="ticketStock"
        rules={[{ required: true, message: "Please input your ticket stock!" }]}
        style={{ marginBottom: '8px' }}
      >
        <Input
          addonBefore={prefixSelector}
          placeholder={ticketStockValue === "unlimited" ? "∞" : "Enter ticket stock"}
          disabled={ticketStockValue === "unlimited"}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Ticket price"
        name="ticketPrice"
        rules={[{ required: ticketType === "paid", message: "Please input your ticket price!" }]}
        style={{ marginBottom: '8px' }}
      >
        <InputNumber
          placeholder="Enter ticket price"
          style={{ width: '100%' }}
          min={0}
          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value?.replace(/\₦\s?|(,*)/g, '') as any}
          disabled={ticketType === "free"}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Purchase limit"
        name="purchaseLimit"
        rules={[{ required: true, message: "Please input your purchase limit!" }]}
        style={{ marginBottom: '8px' }}
      >
        <InputNumber placeholder="Enter purchase limit" style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Ticket description"
        name="ticketDescription"
        rules={[{ required: true, message: "Please input your ticket description!" }]}
        style={{ marginBottom: '8px' }}
      >
        <TextArea
          rows={4}
          placeholder="Enter ticket description"
          style={{
            height: "100px", // Fixed height
            minHeight: "100px",
            maxHeight: "100px",
          }}
        />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked" style={{ marginBottom: '24px' }}>
        <Checkbox>Transfer charge fees to guest</Checkbox> 
      </Form.Item>
    </Form>
  );
};

export default SingleTicket;