"use client";
import AuthLayout from "@/app/components/AuthLayout/AuthLayout";
import LoginForm from "@/app/components/forms/Login";
import HubLoginForm from "@/app/components/forms/HubLogin";
import { Heading5, Small } from "@/app/components/typography/Typography";
import Link from "next/link";
import React, { useState } from "react";

function Login() {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("user");

  return (
    <AuthLayout>
      <div className="mt-2">
        {/* Create space between AuthLayout */}
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

          {/* Tabs for switching forms */}
          <div className="md:w-4/5 md:mx-auto">
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setActiveTab("user")}
                className={`px-4 py-2 rounded-t-[20px] font-BricolageGrotesqueRegular ${
                  activeTab === "user"
                    ? "bg-OWANBE_PRY text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Event Manager
              </button>
              <button
                onClick={() => setActiveTab("hub")}
                className={`px-4 py-2 rounded-t-[20px] font-BricolageGrotesqueRegula ${
                  activeTab === "hub"
                    ? "bg-OWANBE_PRY text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Hall Manager
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 bg-white"> {/* Removed border classes */}
              {activeTab === "user" && (
                <div className="flex flex-col space-y-8">
                  <Heading5 content="Sign into your account" />
                  <LoginForm />
                </div>
              )}
              {activeTab === "hub" && (
                <div className="flex flex-col space-y-8">
                  <Heading5 content="Sign into your hall account" />
                  <HubLoginForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;