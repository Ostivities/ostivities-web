"use client";
import { Small } from "@/app/components/typography/Typography";
import { useLogin } from "@/app/hooks/auth/auth.hook";
import Auth from "@/app/utils/Auth";
import { ILogin } from "@/app/utils/interface";
import { Button, Checkbox, Form, FormProps, Input, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function LoginForm(): JSX.Element {
  const { loginUser } = useLogin();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish: FormProps<ILogin>["onFinish"] = async (value) => {
    if (value) {
      const response = await loginUser.mutateAsync(value);
      if (response.status === 200) {
        form.resetFields();
        router.push("/Dashboard");
      }
    }
  };

  const onFinishFailed: FormProps<ILogin>["onFinishFailed"] = (errorInfo) => {
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
        label="Email Address"
        style={{ fontFamily: "BricolageGrotesqueRegular" }}
        className="font-BricolageGrotesqueRegular"
      >
        <Form.Item
          name={"email"}
          noStyle
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="placeholder:font-BricolageGrotesqueRegular"
            autoComplete="off"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item
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

      <Form.Item>
        <div className="flex items-center justify-between">
          <Checkbox className="font-BricolageGrotesqueSemiBold font-regular">
            Remember me
          </Checkbox>
          <Link
            className="text-OWANBE_PRY underline hover:text-OWANBE_PRY hover:underline font-BricolageGrotesqueSemiBold font-semibold"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base"
          style={{
            background: "#E20000",
            borderRadius: "25px",
            width: "100%",
            height: "51px",
          }}
          loading={loginUser.isPending}
        >
          Sign In
        </Button>
      </Form.Item>

      {/* <div className="mx-auto flex flex-col space-y-5 mt-4 mb-5">
        <Small
          content="or sign in with"
          className="font-BricolageGrotesqueRegular text-sm text-center"
        />

        <Auth />
      </div> */}
    </Form>
  );
}

export default LoginForm;
