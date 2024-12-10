import { IModal } from "@/app/utils/interface";
import { Button, Input, Modal, Space, Form, Row, Col } from "antd";
import React from "react";

import { Heading5 } from "../typography/Typography"; // Assuming this is a custom component

const AddShipping = ({ visible, onCancel, onOk, data }: IModal) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    // Handle form submission logic here
    onOk(); // Close the modal after submission
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={
        <>
          <Heading5
            content={"Create Shipping Method"}
            className=""
            styles={{ fontSize: "16px" }} // Adjust font size here
          />
          <br />
        </>
      }
      visible={visible} // Use `visible` here
      onCancel={onCancel}
      footer={[
        <div
          key="footer-buttons"
          className="flex flex-row items-center justify-center py-6"
        >
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
              form="add-shipping-form"
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
              style={{ width: "190px" }} // Adjust the width as needed
            >
              Create Shipping
            </Button>
          </Space>
        </div>,
      ]}
      width={700}
    >
      <Form
        id="add-shipping-form"
        form={form}
        name="add-shipping"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Shipping Title"
              name="title"
              rules={[{ required: true, message: "Please input the shipping title!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter shipping title" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Shipping Fee (₦)"
              name="fee"
              rules={[{ required: true, message: "Please input the shipping fee!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input type="number" placeholder="Enter shipping fee" min={0} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Shipping Description"
              name="description"
              rules={[{ required: true, message: "Please input the shipping description!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input.TextArea placeholder="Enter shipping description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddShipping;
