import { IAuthLayout } from "@/app/utils/interface";
import React from "react";

function AuthLayout({ children }: IAuthLayout): JSX.Element {
  return <div>{children}</div>;
}

export default AuthLayout;
