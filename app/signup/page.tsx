import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import CreateAccount from "@/app/components/forms/CreateAccount";
import { Heading5, Small } from "@/app/components/typography/Typography";
import Link from "next/link";
import React from "react";

function Signup(): JSX.Element {
  return (
    <AuthLayout>
      <div className="mt-1"> {/* Add margin-top to create space from AuthLayout */}
        <div className="flex flex-col space-y-2">
          <Small
            content={
              <span className="text-sm font-BricolageGrotesqueRegular">
                Existing user?{" "}
                <Link
                  href={"/login"}
                  className="text-OWANBE_PRY underline cursor-pointer hover:text-OWANBE_PRY hover:underline"
                >
                  Sign in
                </Link>
              </span>
            }
            className="float-right place-self-end"
          />

          <div className="md:w-4/5 md:mx-auto flex flex-col  ">
            <Heading5 className="mt-16 mb-6" content="Sign up and start creating events."/>

            <CreateAccount /> 
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Signup;
