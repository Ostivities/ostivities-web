'use client';
import { useLogin } from "@/app/hooks/auth/auth.hook";
import { ILogin } from "@/app/utils/interface";
import { IUser } from "@/app/utils/interface";
import { Button, Form, Input, message, notification, Select, FormProps, Typography } from 'antd';
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const { Title } = Typography;

function VerificationCodeForm(): JSX.Element {
  const { loginUser } = useLogin();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish: FormProps<ILogin>["onFinish"] = async (value) => {
    if (value) {
      const response = await loginUser.mutateAsync(value);
      if (response.status === 200) {
        form.resetFields();
        router.push("/login");
       message.success('Account verification successful');
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
      autoComplete="off"
      form={form}
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: 'BricolageGrotesqueRegular' }}
    >
      <Title level={5} style={{ fontFamily: 'BricolageGrotesqueLight' }}>
  Enter Verification Code
</Title>
      <Form.Item
        name={"verificationcode"}
        noStyle
        rules={[{ required: true, message: 'Please input verification code' }]}
      >
        <div className="flex items-center gap-5">
          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            className="placeholder:font-BricolageGrotesqueRegular flex-1" 
          />
           
        </div>
      </Form.Item>
      <br />
      <br />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="font-BricolageGrotesqueLight text-base"
          style={{
            background: '#E20000',
            borderRadius: '25px',
            width: '100%',
            height: '51px',
          }}
          loading={loginUser.isPending}
        >
          Verify Account
        </Button>
      </Form.Item>
    </Form>
  );
}

export default VerificationCodeForm;