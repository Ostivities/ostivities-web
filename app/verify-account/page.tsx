"use client";
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import VerificationCodeSuspense from "@/app/components/forms/VerifyAccountForm";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Space } from "antd";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/";
import React from "react";
import { useCookies } from "react-cookie";

function VerifyAccount() {
  const [cookies, setCookie] = useCookies([
    "is_registered",
    "user_email",
    "user_password",
    "user_inactive_email",
  ]);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || cookies.user_inactive_email;
  return (
    <AuthLayout>
      <div className="w-4/5 mx-auto flex flex-col space-y-8 pt-16">
        <Space direction="vertical" size={"small"} className="w-full">
          <Heading5 content={"Account Verification"} className="" />
          <Paragraph
            content={
              <span>
                Please enter the verification code sent to{" "}
                <span style={{ color: "#e20000" }}>{email}</span>. If you
                can&apos;t find it in your inbox, please check your spam box.
              </span>
            }
          />
        </Space>
        <VerificationCodeSuspense />
        <br />
      </div>
    </AuthLayout>
  );
}

export default VerifyAccount;
