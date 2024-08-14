import AuthLayout from '@/app/components/AuthLayout/AuthLayout';
import ForgotPasswordForm from '@/app/components/forms/ForgotPasswordForm';
import { Heading3, Heading5, Paragraph, Small } from '@/app/components/typography/Typography';
import { Space } from 'antd';
import Link from 'next/link';
import React from 'react';

function ForgotPassword() {
  return (
    <AuthLayout>
      <div className="mt-2"> {/* Add margin-top to create space from AuthLayout */}
      <div className="flex flex-col space-y-16">
        <Small
        />
        <div className="md:w-4/5 md:mx-auto flex flex-col space-y-8">
        <Space direction="vertical" size={'small'} className="w-5/6">
          <Heading3 content={'Forgot Password'} className="" />
          <Paragraph
            content="Please provide the email address associated with your account, and we will send you instructions on how to reset your password."
            className=""
          />
        </Space>
        <ForgotPasswordForm />
        </div>
      </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
