'use client';
import { Button, Form, FormProps, Input, message, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { useResetPassword } from '@/app/hooks/auth/auth.hook';
import { IResetPassword } from '@/app/utils/interface';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie";

const { Title } = Typography;

function PasswordResetForm(): JSX.Element {
  const { resetPassword } = useResetPassword();
  const [form] = Form.useForm();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [cookies] = useCookies(['forgot_email']);
  const email = cookies?.forgot_email;

  const [timer, setTimer] = useState(0); // For countdown timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // For disabling resend button

  // Handle OTP input
  const onChange = (value: string) => {
    if (value.length === 6) {
      setToken(value);
    }
  };

  // Handle form submission
  const onFinish: FormProps<IResetPassword>["onFinish"] = async (value) => {
    if (value && token.length === 6) {
      const response = await resetPassword.mutateAsync({ ...value, token, email });
      if (response.status === 200) {
        form.resetFields();
        router.push("/login");
      }
    }
  };

  // Handle resend code and timer
  const resendCode = () => {
    if (!isButtonDisabled) {
      message.success('Reset code has been re-sent to your email');
      setTimer(120); // Start 2-minute timer (120 seconds)
      setIsButtonDisabled(true); // Disable the button
    }
  };

  // Timer countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && isButtonDisabled) {
      setIsButtonDisabled(false); // Re-enable the button when timer hits 0
    }
    return () => clearInterval(interval);
  }, [timer, isButtonDisabled]);

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
        name="token"
        rules={[{ required: true, message: 'Please input the code received' }]}
      >
        <div className="flex items-center gap-5">
          <Input.OTP
            onChange={onChange}
            className="placeholder:font-BricolageGrotesqueRegular flex-1"
          />
          <button
            type="button"
            onClick={resendCode}
            className="text-OWANBE_PRY text-s font-semibold"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? `Request again in ${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}` : 'Re-send code'}
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
        name="confirmPassword"
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
          loading={resetPassword.isPending}
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PasswordResetForm;
