import AuthLayout from '@/app/components/AuthLayout/AuthLayout';
import VerifyAccountForm from '@/app/components/forms/VerifyAccountForm';
import { Heading3, Paragraph } from '@/app/components/typography/Typography';
import { Space } from 'antd';
import React from 'react';

function VerifyAccount() {
  return (
    <AuthLayout>
      <div className="w-4/5 mx-auto flex flex-col space-y-8 pt-48">
        <Space direction="vertical" size={'small'} className="w-5/6">
          <Heading3 content={'Account Verification'} className="" />
          <Paragraph
            content="Enter the verification code sent to your registered Email."
            className=""
          />
        </Space>
        <VerifyAccountForm/>
      </div>
    </AuthLayout>
  );
}

export default VerifyAccount;
