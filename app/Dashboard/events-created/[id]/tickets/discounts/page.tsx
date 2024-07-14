"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import DiscountIcon from "@/app/components/Icons/DiscountIcon";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Button, Space } from "antd";
import React from "react";

const EventTicketDiscount = () => {
  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="vertical" size={"small"}>
          <Heading5 className="" content={"Discounts."} />
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={
              "Generate discount codes and implement automatic discounts."
            }
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
                borderRadius: "16px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              onClick={() => {}}
            >
              Create Discount
            </Button>
          </div>
        </div>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventTicketDiscount;
