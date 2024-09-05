import { CloseSquareOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Select } from "antd";
import React, { useState, useEffect } from "react";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import EmailEditor from "../QuillEditor/EmailEditor";

interface FieldType {}

const CollectiveTicket = (): JSX.Element => {
  const { TextArea } = Input;
  const { Option } = Select;
  const [groupPrice, setGroupPrice] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState<number | null>(null);
  const [pricePerTicket, setPricePerTicket] = useState<number | null>(null);
  const [ticketStockValue, setTicketStockValue] = useState<string>("limited"); // Default to "limited"
  const [additionalFields, setAdditionalFields] = useState<{ id: number; compulsory: boolean }[]>([]);
  const [showAdditionalField, setShowAdditionalField] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0); // Counter for unique keys
  const [form] = Form.useForm(); // Initialize form instance
  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };
  
  const ticketType = Form.useWatch("ticketType", form); // Watch ticketType changes

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

  const addAdditionalField = () => {
    setAdditionalFields([...additionalFields, { id: counter, compulsory: false }]);
    setCounter(counter + 1); // Increment the counter for the next key
  };

  const removeAdditionalField = (id: number) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };

  const handleCompulsoryChange = (id: number, checked: boolean) => {
    setAdditionalFields(additionalFields.map(field =>
      field.id === id ? { ...field, compulsory: checked } : field
    ));
  };

  return (
    <Form<FieldType>
      form={form} // Bind form instance
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
          disabled={ticketType === "free"} // Disable if ticket type is "Free"
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
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
          <Option value={6}>6</Option>
          <Option value={7}>7</Option>
          <Option value={8}>8</Option>
          <Option value={9}>9</Option>
          <Option value={10}>10</Option>
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
          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!d))/g, ',')}
        />
      </Form.Item>

      <Form.Item<FieldType> 
        label="Purchase limit"
        name="purchaseLimit"
        rules={[{ required: true, message: "Please input your purchase limit!" }]}
        style={{ marginBottom: '15px' }}
      >
        <InputNumber placeholder="Enter purchase limit" style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Paragraph
            className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Ticket description"}
            styles={{ fontWeight: "bold !important" }}
          />
      <div className="mb-3 pb-16 w-full mt-3">
            <EmailEditor
              initialValue="<p>Enter ticket description!</p>"
              onChange={handleEditorChange}
             />
          </div>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}
      >
        <Checkbox defaultChecked style={{ marginRight: '20px' }}>Transfer charge fees to guest</Checkbox>
        <Checkbox
          onChange={(e) => setShowAdditionalField(e.target.checked)}
        >
          Enable additional information
        </Checkbox>
      </Form.Item>

      {showAdditionalField && (
        <Form.Item style={{ marginBottom: '24px' }}>
          <Form.List name="additionalInfo">
            {(fields, { add }) => (
              <>
                {additionalFields.map(({ id, compulsory }) => (
                  <div key={id} style={{ marginBottom: '16px' }}>
                    <Form.Item
                      name={[id, 'info']}
                      fieldKey={[id, 'info']}
                      rules={[{ required: compulsory, message: 'Please enter additional information' }]}
                      style={{ marginBottom: '8px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input placeholder="Enter additional information" style={{ flex: 1 }} />
                        <Button
                          type="link"
                          icon={<CloseSquareOutlined />}
                          onClick={() => removeAdditionalField(id)}
                          style={{
                            color: '#e20000',
                            marginLeft: '8px', // Adjust margin to position icon beside input field
                          }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item style={{ marginBottom: '8px' }}>
                      <Checkbox
                        checked={compulsory}
                        onChange={(e) => handleCompulsoryChange(id, e.target.checked)}
                      >
                        Make compulsory
                      </Checkbox>
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={addAdditionalField}
                    icon={<PlusOutlined />}
                  >
                    Add question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      )}
    </Form>
  );
};

export default CollectiveTicket; 