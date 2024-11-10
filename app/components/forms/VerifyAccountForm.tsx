"use client";
import { useVerifyOtp } from "@/app/hooks/auth/auth.hook";
import type { GetProps } from "antd";
import { Button, Form, FormProps, Input, message, Typography } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const { Title } = Typography;

type OTPProps = GetProps<typeof Input.OTP>;

function VerificationCodeForm(): JSX.Element {
  const { verifyOtp } = useVerifyOtp();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const router = useRouter();
  const [cookies, setCookie] = useCookies([
    "is_registered",
    "user_email",
    "user_password",
    "user_inactive_email",
  ]);

  const email = searchParams.get("email") || cookies.user_inactive_email;
  const onChange: OTPProps["onChange"] = async (text) => {
    if (text.length === 6) {
      try {
        const response = await verifyOtp.mutateAsync({
          email: email,
          otp: text,
        });
        if (response.data.status === 400) {
          message.error(response?.data?.message);
        } else {
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

  const [timer, setTimer] = useState(0); // For countdown timer
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // For disabling resend button

   // Handle resend code and timer
   const resendCode = () => {
    if (!isButtonDisabled) {
      message.success('Verification code has been re-sent to your email');
      setTimer(600); // Start 10-minute timer (600 seconds)
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
