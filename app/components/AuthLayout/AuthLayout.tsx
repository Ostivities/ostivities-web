import { IAuthLayout } from "@/app/utils/interface";
import React from "react";
import Header from "../Header/Header";
import { Heading3 } from "../typography/Typography";

function AuthLayout({ children }: IAuthLayout): JSX.Element {
  return (
    <main className="overflow-hidden">
      <Header />
      <section className="overflow-hidden">
        <div className="md:container md:mx-auto lg:container lg:mx-auto xl:container xl:mx-auto px-5 pt-8 pb-12 md:pb-12 lg:pb-0 xl:pb-0 md:pt-6 lg:pt-16 xl:pt-16 relative">
          <div className="flex flex-row items-center">
            <div className="w-1/2 flex flex-col">
              <Heading3 className="" content="Welcome to " />
              <Heading3 className="" content="Ostivities" />
            </div>
            <div className="w-1/2">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;
