"use client";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import { Button, Space } from "antd";
import React from "react";
import DiscountIcon from "../Icons/DiscountIcon";
import { Heading5, Paragraph } from "../typography/Typography";

const Discount = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();
  return (
    <Space direction="vertical" size={"large"}>
      <Space direction="vertical" size={"small"}>
        <Heading5 className="" content={"Discounts."} />
        <Paragraph
          className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
          content={"Generate discount codes and implement automatic discounts."}
          styles={{ fontWeight: "normal !important" }}
        />
      </Space>

      <div className="border-dashed border border-OWANBE_DARK h-80 pt-9 pb-9 rounded-lg w-3/4 mx-auto my-5 flex flex-col items-center space-y-8">
        <div className="w-1/2 mx-auto text-center flex flex-row items-center justify-center">
          <DiscountIcon />
        </div>

        <Space
          direction="vertical"
          size={"small"}
          className="mx-auto"
          style={{ width: "75%" }}
          align="center"
        >
          <Heading5 className="text-center" content={"Discount"} />
          <Paragraph
            className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center"
            content={
              "Generate discount codes and implement automatic discounts."
            }
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>

        <div className="w-1/2 mx-auto text-center">
          <Button
            type={"primary"}
            size="large"
            className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-40 rounded-2xl`}
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() => toggleDiscount("Discount_Code")}
          >
            Create Discount
          </Button>
        </div>
      </div>
    </Space>
  );
};

export default Discount;
