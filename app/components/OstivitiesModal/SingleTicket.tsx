import { CloseOutlined, CloseSquareOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import EmailEditor from "../QuillEditor/EmailEditor";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";

const { TextArea } = Input;
const { Option } = Select;


interface FieldType {
  ticketType?: string;
  ticketName?: string;
  ticketStock?: string;
  ticketPrice?: number;
  purchaseLimit?: number;
  ticketDescription?: string;
  remember?: boolean;
  additionalInfo?: { info: string; compulsory: boolean }[];
}

const SingleTicket = (): JSX.Element => {
  const [ticketType, setTicketType] = useState<string>("paid");
  const [ticketStockValue, setTicketStockValue] = useState<string>("");
  const [additionalFields, setAdditionalFields] = useState<{ id: number; compulsory: boolean }[]>([]);
  const [showAdditionalField, setShowAdditionalField] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0); // Counter for unique keys
  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleStockChange = (value: string) => {
    setTicketStockValue(value);
  };

  const handleTicketTypeChange = (value: string) => {
    setTicketType(value);
  };

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

export default SingleTicket;
