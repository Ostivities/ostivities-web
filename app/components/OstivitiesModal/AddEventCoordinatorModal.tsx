import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input, InputNumber, Select, Modal, Space } from "antd";
import React, { useState } from "react";

interface AddEventCoordinatorModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

interface FieldType {}

const AddEventCoordinatorModal: React.FC<AddEventCoordinatorModalProps> = ({ open, onCancel, onOk }) => {
  const { TextArea } = Input;
  const { Option } = Select;

  const [ticketType, setTicketType] = useState<string>("");
  const [ticketStockValue, setTicketStockValue] = useState<string>("");

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // handle form submission
    onOk(); // Close the modal on successful submission
    console.log('Form Values:', values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleRoleTypeChange = (value: string) => {
    setTicketType(value);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={<div style={{ fontSize: '24px', marginBottom: '16px', fontFamily: 'Bricolage Grotesque Medium' }}>Add Event Coordinator</div>}
      footer={[
        <div key="footer-buttons" className="flex flex-row items-center justify-center py-6">
          <Space>
            <Button
              key="cancel"
              type="default"
              size="large"
              className="font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              size="large"
              form="add-event-coordinator-form"
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
              style={{ width: '190px' }} // Adjust the width as needed
            >
              Add Coordinator
            </Button>
          </Space>
        </div>
      ]}
      width={600}
    >
      <Form<FieldType>
        id="add-event-coordinator-form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Coordinators name"
          name="coordinatorsName"
          rules={[{ required: true, message: "Please input coordinators name!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Input placeholder="Enter coordinators name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Coordinators email"
          name="coordinatorsEmail"
          rules={[{ required: true, message: "Please input Coordinators email!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Input placeholder="Enter Coordinators email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Coordinators role"
          name="coordinatorsRole"
          rules={[{ required: true, message: "Please select your permission type!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Select placeholder="Select role type" onChange={handleRoleTypeChange}>
            <Option value="Ticketing Agent">Ticketing Agent</Option>
            <Option value="Auditor">Auditor</Option>
            <Option value="Usher">Usher</Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" style={{ marginBottom: '24px' }}>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventCoordinatorModal;
