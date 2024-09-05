"use client";
import { useVerifyOtp } from "@/app/hooks/auth/auth.hook";
import type { GetProps } from "antd";
import { Button, Form, FormProps, Input, message, Typography } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const { Title } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

function VerificationCodeForm(): JSX.Element {
  const { verifyOtp } = useVerifyOtp();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const router = useRouter();

  const email = searchParams?.get("email") as string;

  const onChange: OTPProps["onChange"] = async (text) => {
    if (text.length === 6) {
      try {
        const response = await verifyOtp.mutateAsync({
          email: email,
          otp: text,
        });
        if (response.status === 200) {
          form.resetFields();
          router.push("/login");
          message.success("Account verification successful");
        }
      } catch (error) {
        return error;
      }
    }
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  return (
    <div
      className="w-full font-BricolageGrotesqueRegular flex flex-col"
      style={{ fontFamily: "BricolageGrotesqueRegular" }}
    >
      <Title level={5} style={{ fontFamily: "BricolageGrotesqueLight" }}>
        Enter Verification Code
      </Title>
      <Form.Item
        name={"verificationcode"}
        noStyle
        rules={[{ required: true, message: "Please input verification code" }]}
      >
        <div className="flex items-center gap-5">
          <Input.OTP
            formatter={(str) => str.toUpperCase()}
            className="placeholder:font-BricolageGrotesqueRegular flex-1 text-center"
            style={{ width: "300px" }}
            {...sharedProps}
          />
        </div>
      </Form.Item>
      <br />
      <br />
      <Form.Item>
        <Button
          type="primary"
          htmlType="button"
          className="font-BricolageGrotesqueLight text-base"
          style={{
            background: "#E20000",
            borderRadius: "25px",
            width: "100%",
            height: "51px",
          }}
          loading={verifyOtp.isPending}
        >
          {verifyOtp.isPending ? "Please wait..." : "Verify Account"}
        </Button>
      </Form.Item>
    </div>
  );
}

function VerificationCodeSuspense(): JSX.Element {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <VerificationCodeForm />
    </React.Suspense>
  );
}

export default VerificationCodeSuspense;
