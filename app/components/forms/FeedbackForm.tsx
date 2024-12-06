"use client";
import "@/app/globals.css";
import { useRegister } from "@/app/hooks/auth/auth.hook";
import { IUser } from "@/app/utils/interface";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  Row,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Rate } from 'antd';

const App: React.FC = () => <Rate />;

function Feedback(): JSX.Element {
  const router = useRouter();
  const { registerUser } = useRegister();
  const [form] = Form.useForm();

  const onFinish: FormProps<IUser>["onFinish"] = async (values) => {
    if (values) {
      const response = await registerUser.mutateAsync(values);
      if (response.status === 201) {
        form.resetFields();
        router.push("/login");
      }
    }
  };

  const onFinishFailed: FormProps<IUser>["onFinishFailed"] = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  // State to track whether the checkbox is checked
  const [isChecked, setIsChecked] = useState(false);

  // Handler for checkbox change
  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked); // Update state based on checkbox state
  };

  // Handle form values change (to monitor checkbox state)
  const onValuesChange = (changedValues: any) => {
    if (changedValues?.terms_and_condition !== undefined) {
      setIsChecked(changedValues.terms_and_condition); // Update checkbox state from form
    }
  };

  return (
    <Form
      name="validateOnly"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
      onValuesChange={onValuesChange} // Track changes in form values
    >
      <Row gutter={4}>
        <Col span={12}>
          <Form.Item<IUser>
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input your first name" }]}
          >
            <Input
              placeholder="Enter your first name"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<IUser>
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input your Last name" }]}
          >
            <Input
              placeholder="Enter your last name"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={4}>
        <Col span={12}>
          <Form.Item<IUser>
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please input your email address" }]}
          >
            <Input
              placeholder="Enter your email address"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<IUser>
            label="Phone Number"
            name="phonenumber"
            rules={[{ required: true, message: "Please input your Phone Number" }]}
          >
            <Input
              placeholder="Enter your phone number"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={4}>
        <Col span={24}>
          <Form.Item
            label="Rate Us"
            style={{ fontFamily: "BricolageGrotesqueRegular", marginBottom: '8px' }}
            className="font-BricolageGrotesqueRegular"
          >
            <Rate style={{ fontSize: '30px' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={4}>
        <Col span={24}>
          <Form.Item
            label="Additional Feedback"
            style={{ fontFamily: "BricolageGrotesqueRegular", marginBottom: '8px' }} // Reduced marginBottom
            className="font-BricolageGrotesqueRegular"
          >
            <Form.Item<IUser>
              noStyle
              name="feedback"
              rules={[{ required: false, message: "Please input your feedback" }]}
            >
              <Input.TextArea
                placeholder="Enter your feedback"
                style={{
                  minHeight: "220px",
                  maxHeight: "220px",
                  padding: "8px 12px",
                  boxSizing: "border-box",
                }}
                className="placeholder:font-BricolageGrotesqueRegular"
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      {/* Terms and Conditions Checkbox */}
      <Form.Item<IUser>
        name="terms_and_condition"
        valuePropName="checked"
        rules={[{ required: true, message: "Please accept the Terms and Conditions" }]}
      >
        <Checkbox>
          I accept the{" "}
          <a
            href="/terms-and-condition"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#e20000", textDecoration: "none" }}
          >
            Terms and Conditions
          </a>
        </Checkbox>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base mt-5"
          style={{
            background: isChecked ? "#E20000" : "#ccc", // Button color based on checkbox state
            borderRadius: "25px",
            border: "none",
            width: "60%",
            height: "51px",
            cursor: isChecked ? "pointer" : "not-allowed", // Change cursor style when disabled
          }}
          disabled={!isChecked} // Disable button if checkbox is not checked
        >
          Submit Feedback
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Feedback;
