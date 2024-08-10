'use client';
import { Button, Form, Input, message, notification, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

function VerificationCodeForm(): JSX.Element {
  const [form] = Form.useForm();

  const onFinish = (value: object) => { 
    console.log(value);
  };

  const resendCode = () => {
    message.success('Verification code has been re-sent to your email');
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
      <Title level={5}></Title>
      <Form.Item
        name="verificationcode"
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
        >
          Verify Account
        </Button>
      </Form.Item>
    </Form>
  );
}

export default VerificationCodeForm;