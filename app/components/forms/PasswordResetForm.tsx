'use client';
import { Button, Form, FormProps, GetProps, Input, message, Typography } from 'antd';
import React, {useState} from 'react';
import { useVerifyOtp, useResetPassword } from '@/app/hooks/auth/auth.hook';
import { IResetPassword, IResetToken } from '@/app/utils/interface';
import { useRouter } from 'next/navigation';
import { useCookies } from "react-cookie"

const { Title } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

function PasswordResetForm(): JSX.Element {
  const { resetPassword } = useResetPassword();
  const [form] = Form.useForm();
  const router = useRouter();
  const [token, setToken] = useState("")
  const [cookies, setCookie] = useCookies(['forgot_email']);
  const email = cookies?.forgot_email

  const onChange: OTPProps["onChange"] = async (text) => {
    if (text.length === 6){
      setToken(text)
    }}
    

  const onFinish: FormProps<IResetPassword>["onFinish"] = async (value) => {
    if (value && token.length === 6) {
      const response = await resetPassword.mutateAsync({...value, token, email});
      if (response.status === 200) {
        form.resetFields();
        router.push("/login");
      }
    }
  };

  const resendCode = () => {
    message.success('Reset code has been re-sent to your email');
  };

  const sharedProps: OTPProps = {
    onChange,
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
        name="token"
        noStyle
        rules={[{ required: true, message: 'Please input your OTP' }]}
      >
        <div className="flex items-center gap-5">
          <Input.OTP
            {...sharedProps}
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
