"use client";
import { Button, Input, Space } from "antd";

const NewsLetter: React.FC = () => {
  return (
    <>
      <Space style={{ width: "100%" }}>
        <Input
          placeholder="Your email"
          className="rounded-3xl news-letter font-BricolageGrotesqueMedium font-medium placeholder:font-BricolageGrotesqueMedium"
          suffix={
            <Button
              className="w-28 rounded-3xl text-white font-BricolageGrotesqueMedium font-medium hover:text-white"
              style={{
                background: "#19235b !important",
                boxShadow: "none",
                outline: "none",
              }}
            >
              Subscribe
            </Button>
          }
        />
      </Space>
    </>
  );
};

export default NewsLetter;
