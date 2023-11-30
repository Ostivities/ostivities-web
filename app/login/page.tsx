import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import { Heading5, Small } from "@/app/components/typography/Typography";
import React from "react";

function Login() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-8">
        <Small
          content={
            <span className="text-sm font-BricolageGrotesqueRegular">
              Already a member? <span className="text-OWANBE_PRY">Sign in</span>
            </span>
          }
          className="float-right"
        />

        <div className="w-4/5 mx-auto">
          <Heading5 className="" content="Create Your Account" />
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
