"use client";
import { Small } from "@/app/components/typography/Typography";
import { useLogin } from "@/app/hooks/auth/auth.hook";
import { successFormatter } from "@/app/utils/helper";
import { ILogin } from "@/app/utils/interface";
import { Button, Checkbox, Form, FormProps, Input, message, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

function LoginForm(): JSX.Element {
  const { loginUser } = useLogin();
  const [form] = Form.useForm();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "is_registered",
    "user_email",
    "user_password",
    "user_inactive_email",
  ]);

  useEffect(() => {
    // Pre-fill the form with cookie data if available
    form.setFieldsValue({
      email: cookies?.user_email || "",
      password: cookies?.user_password || "",
      remember: cookies?.user_email && cookies?.user_password ? true : false,
    });
  }, [cookies, form]);

  const onFinish: FormProps<ILogin>["onFinish"] = async (value) => {
    const { remember, ...rest } = value;

    if (value) {
      const response = await loginUser.mutateAsync({ ...rest });
      if (response?.data?.data?.is_active === false) {
        setCookie("user_inactive_email", value.email, { path: "/" });
        message.info(response?.data?.data?.message);
        router.push("/verify-account");
      } else {
        // Handle "Remember Me" functionality
        if (remember) {
          setCookie("user_email", value.email, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // 7 days expiry
          setCookie("user_password", value.password, { path: "/", expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        } else {
          removeCookie("user_email", { path: "/" });
          removeCookie("user_password", { path: "/" });
        }

        setCookie("is_registered", "registered", { path: "/" });
        successFormatter(response);
        form.resetFields();
        router.push("/discover");
      }
    }
  };

  const onFinishFailed: FormProps<ILogin>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
  };

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please input your password"));
    }
    const hasAlphabet = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (hasAlphabet && hasNumber && hasSpecialChar) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Password must contain letters, numbers, and special characters"));
  };

  return (
    <Form
      name="loginForm"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      {/* Email Address Field */}
      <Form.Item
        label="Email Address"
        name="email"
        rules={[{ required: true, message: "Please input your email" }]}
      >
        <Input
          type="email"
          placeholder="Enter your email"
          className="placeholder:font-BricolageGrotesqueRegular"
          autoComplete="off"
        />
      </Form.Item>

      {/* Password Field */}
      <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[{ required: true, validator: validatePassword }]}
      >
        <Input.Password
          placeholder="Enter your password"
          className="placeholder:font-BricolageGrotesqueRegular"
        />
      </Form.Item>

      {/* Remember Me and Forgot Password */}
      <Form.Item name="remember" valuePropName="checked">
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

      {/* Submit Button */}
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
    </Form>
  );
}

export default LoginForm;