"use client";
import { Small } from "@/app/components/typography/Typography";
import { useLogin } from "@/app/hooks/auth/auth.hook";
import Auth from "@/app/utils/Auth";
import { successFormatter } from "@/app/utils/helper";
import { ILogin } from "@/app/utils/interface";
import { Button, Checkbox, Form, FormProps, Input, message, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

function LoginForm(): JSX.Element {
  const { loginUser } = useLogin();
  const [form] = Form.useForm();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "is_registered",
    "user_email",
    "user_password",
    "user_inactive_email",
  ]);

  const onFinish: FormProps<ILogin>["onFinish"] = async (value) => {
    const { remember, ...rest } = value;
    if (value) {
      const response = await loginUser.mutateAsync({ ...rest });
      if (response?.data?.data?.is_active === false) {
        setCookie("user_inactive_email", value.email);
        message.info(response?.data?.data?.message);
        router.push("/verify-account");
      } else {
        if (remember) {
          setCookie("user_email", value.email);
          setCookie("user_password", value.password);
        }
        setCookie("is_registered", "registered");
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
  
    return Promise.reject(new Error(""));
  };
  

  return (
    <Form
      name="validateOnly"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
      initialValues={{
        email: cookies?.user_email || "",
        password: cookies?.user_password || "",
      }}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      <Form.Item
  label="Email Address"
  style={{ fontFamily: "BricolageGrotesqueRegular" }}
  className="font-BricolageGrotesqueRegular"
>
  <Form.Item
    name="email"
    noStyle
    rules={[{ required: true, message: "Please input your email" }]}
  >
    <Input
      type="email"
      placeholder="Enter your email"
      className="placeholder:font-BricolageGrotesqueRegular"
      autoComplete="off"
      defaultValue={cookies?.user_email}
      onChange={(e) => {
        const email = e.target.value.toLowerCase(); // Convert input to lowercase
        form.setFieldsValue({ email }); // Update the form field value
      }}
    />
  </Form.Item>
</Form.Item>


      <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[{ required: true, validator: validatePassword }]}
      >
        <Input.Password
          defaultValue={cookies?.user_password}
          placeholder="Enter your password"
          className="placeholder:font-BricolageGrotesqueRegular"
        />
      </Form.Item>

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
