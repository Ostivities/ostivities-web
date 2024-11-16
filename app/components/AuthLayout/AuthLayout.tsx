import Header from "@/app/components/Header2/Header2";
import { Heading3 } from "@/app/components/typography/Heading3";
import { IAuthLayout } from "@/app/utils/interface";
import { Card } from "antd";
import React from "react";

function AuthLayout({ children }: IAuthLayout): JSX.Element {
  return (
    <main className="overflow-hidden min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 md:mt-8 bg-OWANBE_AUTH_BG md:flex items-center justify-center">
        <div className="md:container md:mx-auto px-5 pt-8 pb-12 lg:pb-0 md:pt-6 lg:pt-0">
          <div className="flex md:flex-row flex-col mt-4 md:gap-12 gap-16 relative md:items-center auth-background"> 
            <div className="w-5/12 flex flex-col space-y-3 pt-6">
              <h5 className="leading-10 w-max font-BricolageGrotesqueRegular welcome-heading md:text-5xl text-4xl">
                Welcome to
              </h5>
              <Heading3
                className="custom-heading font-bold md:text-5xl text-4xl"
                content="Ostivities"
              />
            </div>
            <div className="w-full md:w-7/12">
              {" "}
              <Card
                className="min-h-full md:px-5 w-full !rounded-[35px]"
                style={{
                  // borderRadius: '70px 70px 70px 70px',
                  boxShadow: "0px 8px 40px 0px #00000014",
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
