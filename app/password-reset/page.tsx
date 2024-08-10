import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import PasswordResetForm from "@/app/components/forms/PasswordResetForm";
import { Heading3, Paragraph } from "@/app/components/typography/Typography";
import { Space } from "antd";
import React from "react";

function PasswordReset() {
  return (
    <AuthLayout>
      <div className="w-4/5 mx-auto flex flex-col space-y-8 pt-32">
        <Space direction="vertical" size={"small"} className="w-5/6">
          <Heading3 content={"Password Reset"} className="" />
          <Paragraph
            content="A reset code has been sent to your registered email."
            className=""
          />
        </Space>

        <PasswordResetForm />
      </div>
    </AuthLayout>
  );
}

export default PasswordReset;
