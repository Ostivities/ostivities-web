import { IModal } from "@/app/utils/interface";
import { Button, Input, Modal, Space, Form, Row, Col, Select } from "antd";
import React, { useState } from "react";
import { Heading5 } from "../typography/Typography"; // Assuming this is a custom component

// Define the field types for the form
interface FieldType {
  coordinatorsName: string;
  coordinatorsEmail: string;
  coordinatorsphoneNumber: string;
  coordinatorsRole: string;
  password?: string;
}

const AddCoordinators = ({ open, onCancel, onOk, data }: IModal) => {
  const { Option } = Select;
  const [role, setRole] = useState<string | null>('Ticketing Agent'); // Preselect "Ticketing Agent"
  const [form] = Form.useForm(); 

  const onFinish = (values: FieldType) => {
    // handle form submission
    console.log('Form Values:', values);
    onOk(); // Close the modal on successful submission
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Modal
      title={
        <>
          <Heading5
            content={"Add Event Coordinator"}  
            className=""
            styles={{ fontSize: "16px" }} // Adjust font size here
          />
          <br />
        </>
      }
      open={open}
      onCancel={onCancel}
      onOk={onOk}
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
width={700}
>
      <Form<FieldType>
        id="add-event-coordinator-form"
        form={form}
        name="basic"
        initialValues={{ coordinatorsRole: 'Ticketing Agent' }} // Set initial value for role
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item<FieldType>
              label="Coordinator's Name"
              name="coordinatorsName"
              rules={[{ required: true, message: "Please input coordinator's name!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Input placeholder="Enter coordinator's name"  />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="Coordinator's Email"
              name="coordinatorsEmail"
              rules={[{ required: true, message: "Please input coordinator's email!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Input placeholder="Enter coordinator's email" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="Coordinator's Phone Number"
              name="coordinatorsphoneNumber"
              rules={[{ required: true, message: "Please input coordinator's phone number!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Input placeholder="Enter coordinator's phone number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<FieldType>
              label="Coordinator's Role"
              name="coordinatorsRole"
              rules={[{ required: true, message: "Please select coordinator's role!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Select
                placeholder="Select role type"
                onChange={(value) => setRole(value)} // Update role state on selection
                
                value={role}
              >
                <Option value="Ticketing Agent">Ticketing Agent</Option>
                <Option value="Auditor">Auditor</Option>
                <Option value="Usher">Usher</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Conditionally render the password field if "Ticketing Agent" is selected */}
        {role === "Ticketing Agent" && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please generate a password for the Ticketing Agent!" }]}
                style={{ marginBottom: '24px' }} // Add margin bottom to the last form item
              >
                <Input.Password
                  placeholder="Enter password"
                  style={{ width: '100%' }}
                 
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default AddCoordinators;
