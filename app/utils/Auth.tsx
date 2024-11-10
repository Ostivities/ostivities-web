import Twitter from "@/public/Twitter.svg";
import Facebook from "@/public/facebook.svg";
import Google from "@/public/google.svg";
import { Space } from "antd";
import Image from "next/image";
import React from "react";

function Auth() {
  return (
    <Space direction="horizontal" size={"small"}>
      <Image src={Google} alt="google" className="cursor-pointer" />
      <Image src={Facebook} alt="fb" className="cursor-pointer" />
      <Image src={Twitter} alt="twitter" className="cursor-pointer" />
    </Space>
  );
}

export default Auth;
