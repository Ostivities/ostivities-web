'use client';
import { Button, Form, Input, message, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

function PasswordResetForm(): JSX.Element {
  const [form] = Form.useForm();

  const onFinish = (value: object) => {
    console.log(value);
  };

  const resendCode = () => {
    message.success('Reset code has been re-sent to your email');
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
  Enter Reset Code
</Title>

      <Form.Item
        name="resetcode"
        noStyle
        rules={[{ required: true, message: 'Please input reset code' }]}
      >
        <div className="flex items-center gap-5">
          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            className="placeholder:font-BricolageGrotesqueRegular flex-1"
          />
          <button
            type="button"
            onClick={resendCode}
            className="text-OWANBE_PRY text-s font-semibold"
          >
            Re-send code
          </button>
        </div>
      </Form.Item>
      <br />
      <Form.Item
        label="Enter your New Password"
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Please input your new password' }]}
      >
        <Input.Password
          placeholder="Enter your New password"
          className="placeholder:font-BricolageGrotesqueRegular"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm your New Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Re-enter your password"
          className="placeholder:font-BricolageGrotesqueRegular"
        />
      </Form.Item>
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
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PasswordResetForm;
