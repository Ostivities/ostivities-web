import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Select } from "antd";
import React, { useState, useEffect } from "react";

interface FieldType {}

const CollectiveTicket = (): JSX.Element => {
  const { TextArea } = Input;
  const { Option } = Select;

  const [groupPrice, setGroupPrice] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState<number | null>(null);
  const [pricePerTicket, setPricePerTicket] = useState<number | null>(null);
  const [ticketStockValue, setTicketStockValue] = useState<string>("limited"); // Default to "limited"

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (groupPrice !== null && groupSize !== null) {
      setPricePerTicket(groupPrice / groupSize);
    } else {
      setPricePerTicket(null);
    }
  }, [groupPrice, groupSize]);

  const handleGroupPriceChange = (value: number | null) => {
    setGroupPrice(value);
  };

  const handleGroupSizeChange = (value: number) => {
    setGroupSize(value);
  };

  const prefixSelector = (
    <Select
      defaultValue="limited"
      style={{ width: 120 }}
      onChange={(value: string) => setTicketStockValue(value)}
    >
      <Option value="limited">Limited</Option>
      <Option value="unlimited">Unlimited</Option>
    </Select>
  );

  return (
    <Form<FieldType>
      name="basic"
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
        <Select placeholder="Select ticket type">
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
        label="Group price"
        name="groupPrice"
        rules={[{ required: true, message: "Please input your group price!" }]}
        style={{ marginBottom: '8px' }}
      >
        <InputNumber
          placeholder="Enter group price"
          style={{ width: '100%' }}
          min={0}
          onChange={handleGroupPriceChange}
          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value?.replace(/\₦\s?|(,*)/g, '') as any}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Group size"
        name="groupSize"
        rules={[{ required: true, message: "Please select your group size!" }]}
        style={{ marginBottom: '8px' }}
      >
        <Select placeholder="Select group size" onChange={handleGroupSizeChange}>
          <Option value={2}>Couple</Option>
          <Option value={3}>Trio</Option>
          <Option value={4}>Quads</Option>
        </Select>
      </Form.Item>

      <Form.Item<FieldType>
        label="Price per ticket"
        name="pricePerTicket"
        style={{ marginBottom: '8px' }}
      >
        <InputNumber
          value={pricePerTicket !== null ? pricePerTicket : undefined}
          disabled
          style={{ width: '100%' }}
          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
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

      <div>
        <p style={{ marginBottom: '16px' }}>Would you like to gather more information?</p>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} style={{ marginBottom: '16px' }}>
                  <Form.Item
                    label="Custom Question"
                    required={false}
                    style={{ marginBottom: '8px' }}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: false,
                          whitespace: true,
                          message: "Please input question.",
                        },
                      ]}
                      noStyle
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                          placeholder="e.g would you be willing to attend this event?"
                          style={{ flex: 1, marginRight: 8 }}
                        />
                        <CloseOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          style={{ color: '#e20000', fontSize: '16px' }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      name={[field.name, 'compulsory']}
                      valuePropName="checked"
                      noStyle
                    >
                      <Checkbox>Make this question compulsory</Checkbox>
                    </Form.Item>
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add()}
                  style={{ color: '#e20000', padding: 0 }}
                  icon={<PlusOutlined style={{ color: '#e20000', fontSize: '16px' }} />}
                >
                  Add question
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    </Form>
  );
};

export default CollectiveTicket;
