"use client";
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import VerifyAccountForm from "@/app/components/forms/VerifyAccountForm";
import { Heading3, Paragraph } from "@/app/components/typography/Typography";
import { Space } from "antd";
import React from "react";

function VerifyAccount() {
  const email = localStorage.getItem("email") as string | any;
  return (
    <AuthLayout>
      <div className="w-4/5 mx-auto flex flex-col space-y-8 pt-48">
        <Space direction="vertical" size={"small"} className="w-5/6">
          <Heading3 content={"Account Verification"} className="" />
          <Paragraph
            content={`Please enter the verification code sent to ${email}. If you can't find it in your inbox, please check your spam box.`}
            className=""
          />
        </Space>
        <VerifyAccountForm />
        <br />
        <br />
        <br />
        <br />
      </div>
    </AuthLayout>
  );
}

export default VerifyAccount;
