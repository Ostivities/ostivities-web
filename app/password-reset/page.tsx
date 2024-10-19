'use client'

import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import PasswordResetForm from "@/app/components/forms/PasswordResetForm";
import { Heading3, Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Space } from "antd";
import React from "react";
import { useCookies } from "react-cookie";

function PasswordReset() {
  const [cookies, setCookie] = useCookies(['forgot_email'])
  const email = cookies?.forgot_email

  return (
    <AuthLayout>
      <div className="w-4/5 mx-auto flex flex-col space-y-8 pt-32">
        <Space direction="vertical" size={"small"} className="w-5/6">
          <Heading5 content={"Password Reset"} className="" />
          <Paragraph
            content={`A reset code has been sent to ${email ? email: "your email"}`}
            className=""
          />
        </Space>

        <PasswordResetForm />
      </div>
    </AuthLayout>
  );
}

export default PasswordReset;
