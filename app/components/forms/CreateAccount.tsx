"use client";
import "@/app/globals.css";
import { useRegister } from "@/app/hooks/auth/auth.hook";
import { ACCOUNT_TYPE } from "@/app/utils/enums";
import { IUser } from "@/app/utils/interface";
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

function CreateAccount(): JSX.Element {
  const router = useRouter();
  const { registerUser } = useRegister();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [val, setval] = useState<string>("");

  const onFinish: FormProps<IUser>["onFinish"] = async (values) => {
    if (values) {
      const response = await registerUser.mutateAsync(values);
      if (response.status === 201) {
        form.resetFields();
        linkRef.current?.click();
        // router.push("/verify-account");
      }
    }
  };

  const onFinishFailed: FormProps<IUser>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
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
    >
      <Form.Item
        label="Choose an Account Type"
        style={{ fontFamily: "BricolageGrotesqueRegular", marginBottom: "8px" }} // Reduced marginBottom
        className="font-BricolageGrotesqueRegular"
        help={
          !val ? null : (
            <span className="font-BricolageGrotesqueLight text-OWANBE_PRY">
              {val === ACCOUNT_TYPE.PERSONAL
                ? "Are you an individual looking to sell tickets? This account type is tailored for you."
                : "Are you a registered business looking to sell tickets? This account type is tailored for you."}
            </span>
          )
        }
      >
        <Form.Item<IUser>
          name="accountType"
          noStyle
          rules={[
            {
              required: true,
              message: "Please select an account type",
            },
          ]}
        >
          <Select
            placeholder="Select"
            onChange={(e) => {
              setval(e);
            }}
          >
            <Option value={ACCOUNT_TYPE.PERSONAL}>Personal</Option>
            <Option value={ACCOUNT_TYPE.ORGANISATION}>Organization</Option>
          </Select>
        </Form.Item>
      </Form.Item>

      {val === ACCOUNT_TYPE.ORGANISATION ? (
        <Form.Item
          label="Business Name"
          style={{
            fontFamily: "BricolageGrotesqueRegular",
            marginBottom: "8px",
          }} // Reduced marginBottom
          className="font-BricolageGrotesqueRegular"
        >
          <Form.Item<IUser>
            name="businessName"
            noStyle
            rules={[
              {
                required: val === ACCOUNT_TYPE.ORGANISATION,
                message: "Please input your Business Name",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter your Business Name"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Form.Item>
      ) : (
        <Row gutter={4}>
          {" "}
          {/* Reduced gutter size */}
          <Col span={12}>
            <Form.Item
              label="First Name"
              style={{
                fontFamily: "BricolageGrotesqueRegular",
                marginBottom: "8px",
              }} // Reduced marginBottom
              className="font-BricolageGrotesqueRegular"
            >
              <Form.Item<IUser>
                name="firstName"
                noStyle
                rules={[
                  {
                    required: val === ACCOUNT_TYPE.PERSONAL,
                    message: "Please input first name",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                  className="placeholder:font-BricolageGrotesqueRegular"
                />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              style={{
                fontFamily: "BricolageGrotesqueRegular",
                marginBottom: "8px",
              }} // Reduced marginBottom
              className="font-BricolageGrotesqueRegular"
            >
              <Form.Item<IUser>
                name="lastName"
                noStyle
                rules={[
                  {
                    required: val === ACCOUNT_TYPE.PERSONAL,
                    message: "Please input last name",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  className="placeholder:font-BricolageGrotesqueRegular"
                />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item
        label="Email Address"
        style={{ fontFamily: "BricolageGrotesqueRegular", marginBottom: "8px" }} // Reduced marginBottom
        className="font-BricolageGrotesqueRegular"
      >
        <Form.Item<IUser>
          noStyle
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="placeholder:font-BricolageGrotesqueRegular"
          />
        </Form.Item>
      </Form.Item>

      <Row gutter={4}>
        {" "}
        {/* Reduced gutter size */}
        <Col span={12}>
          <Form.Item<IUser>
            label="Password"
            name="password"
            hasFeedback
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item<IUser>
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Re-enter your password"
              className="placeholder:font-BricolageGrotesqueRegular"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<IUser>
        name="terms_and_condition"
        valuePropName="checked"
        rules={[
          { required: true, message: "Please accept the Terms and Conditions" },
        ]}
      >
        <Checkbox>
          <span style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            I accept the{" "}
            <a
              href="/terms-and-condition"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#e20000",
                textDecoration: "none",
                fontFamily: "Bricolage Grotesque, sans-serif",
              }}
            >
              Terms and Conditions
            </a>
          </span>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base mt-5"
          style={{
            background: "#E20000",
            borderRadius: "25px",
            width: "100%",
            height: "51px",
          }}
          loading={registerUser.isPending}
        >
          Sign Up
        </Button>
        <Link
          href={{
            pathname: "/verify-account",
            query: { email: form.getFieldValue("email") },
          }}
          style={{ display: "none" }}
          ref={linkRef}
          passHref
          legacyBehavior
          className="hidden"
        >
          <a ref={linkRef} style={{ display: "none" }}>
            Verify Account
          </a>
        </Link>
      </Form.Item>
    </Form>
  );
}

export default CreateAccount;
