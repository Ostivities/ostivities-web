import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import LoginForm from "@/app/components/forms/Login";
import { Heading5, Small } from "@/app/components/typography/Typography";
import Link from "next/link";
import React from "react";

function Login() {
  return (
    <AuthLayout>
      <div className="mt-2"> {/* Add margin-top to create space from AuthLayout */}
      <div className="flex flex-col space-y-16">
        <Small
          content={
            <span className="text-sm font-BricolageGrotesqueRegular">
              New user?{" "}
              <Link
                href={"/signup"}
                className="text-OWANBE_PRY underline hover:text-OWANBE_PRY hover:underline"
              >
                Sign up
              </Link>
            </span>
          }
          className="float-right place-self-end"
        />

        <div className="md:w-4/5 md:mx-auto flex flex-col space-y-8">
          <Heading5 className="" content="Sign into your account" />
          <LoginForm />
        </div>
      </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
