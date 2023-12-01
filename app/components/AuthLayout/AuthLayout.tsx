import Header from "@/app/components/Header/Header";
import { Heading3 } from "@/app/components/typography/Typography";
import { IAuthLayout } from "@/app/utils/interface";
import { Card } from "antd";
import React from "react";

function AuthLayout({ children }: IAuthLayout): JSX.Element {
  return (
    <main className="overflow-hidden">
      <Header />
      <section className="overflow-hidden bg-OWANBE_AUTH_BG min-h-screen">
        <div className="md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto px-5 pt-8 pb-12 md:pb-12 lg:pb-0 xl:pb-0 md:pt-6 lg:pt-0 xl:pt-0 relative">
          <div className="flex flex-row items-center auth-background mt-3">
            <div className="w-5/12 flex flex-col">
              <Heading3 className="" content="Welcome to " />
              <Heading3 className="" content="Ostivities" />
            </div>
            <div className="w-7/12">
              <Card
                className="min-h-full px-5"
                style={{
                  borderRadius: "70px 70px 0px 0px",
                  boxShadow: "0px 8px 24px 0px #00000014",
                  border: "1px solid #ffffff",
                }}
              >
                {children}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
