import { Button, Form, FormProps, Input, Select, Modal, Space } from "antd";
import React, { useState } from "react";

// Define the props expected by the modal component
interface AddEventCoordinatorModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}

// Define the field types for the form
interface FieldType {
  coordinatorsName: string;
  coordinatorsEmail: string;
  coordinatorsphoneNumber: string;
  coordinatorsRole: string;
}

const AddEventCoordinatorModal: React.FC<AddEventCoordinatorModalProps> = ({ open, onCancel, onOk }) => {
  const { Option } = Select;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // handle form submission
    console.log('Form Values:', values);
    onOk(); // Close the modal on successful submission
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
          label="Coordinator's Name"
          name="coordinatorsName"
          rules={[{ required: true, message: "Please input coordinator's name!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Input placeholder="Enter coordinator's name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Coordinator's Email"
          name="coordinatorsEmail"
          rules={[{ required: true, message: "Please input coordinator's email!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Input placeholder="Enter coordinator's email" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Coordinator's Phone Number"
          name="coordinatorsphoneNumber"
          rules={[{ required: true, message: "Please input coordinator's phone number!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Input placeholder="Enter coordinator's phone number" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Coordinator's Role"
          name="coordinatorsRole"
          rules={[{ required: true, message: "Please select coordinator's role!" }]}
          style={{ marginBottom: '8px' }}
        >
          <Select placeholder="Select role type">
            <Option value="Ticketing Agent">Ticketing Agent</Option>
            <Option value="Auditor">Auditor</Option>
            <Option value="Usher">Usher</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventCoordinatorModal;
