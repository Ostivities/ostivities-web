import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import CreateAccount from "@/app/components/forms/CreateAccount";
import { Heading5, Small } from "@/app/components/typography/Typography";
import React from "react";

function Signup(): JSX.Element {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-8">
        <Small
          content={
            <span className="text-sm font-BricolageGrotesqueRegular">
              Already a member?{" "}
              <span className="text-OWANBE_PRY cursor-pointer">Sign in</span>
            </span>
          }
          className="float-right place-self-end"
        />

        <div className="w-4/5 mx-auto flex flex-col space-y-8">
          <Heading5 className="" content="Create Your Account" />

          <CreateAccount />
        </div>
      </div>
    </AuthLayout>
  );
}

export default Signup;
