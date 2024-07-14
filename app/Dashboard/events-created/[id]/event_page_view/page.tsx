"use client";
import Dropzone from "@/app/components/Dropzone/Dropzone";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import useComponentDisabled from "@/app/hooks/utils/utils.hooks";
import PlaceholderImage from "@/public/images/placeholder.jpeg";
import { Button, Space } from "antd";
import Image from "next/image";
import React from "react";

const EventPageView = () => {
  const [componentDisabled, setComponentDisabled] = useComponentDisabled();
  return (
    <EventDetailsComponent>
      <div className="flex flex-row w-full">
        <div className="w-11/12 flex flex-col space-y-5">
          <Space direction="vertical" size={"small"}>
            <Heading5 className="" content={"Event Page Appearance"} />
            <Paragraph
              className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
              content={"Upload your event image here."}
              styles={{ fontWeight: "normal !important" }}
            />
          </Space>

          {componentDisabled === true ? (
            <div className="flex flex-row items-center justify-center mx-auto w-11/12">
              <Image
                src={PlaceholderImage}
                alt="Selected Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  margin: "auto",
                  textAlign: "center",
                }}
              />
            </div>
          ) : (
            <Dropzone className="w-full border-dashed border flex items-center rounded-lg cursor-pointer" />
          )}

          <div className="flex flex-row items-center justify-center">
            {componentDisabled === true ? (
              <Button
                type="default"
                htmlType="button"
                size={"large"}
                disabled={false}
                className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={() => {
                  setComponentDisabled(false);
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                type="default"
                htmlType="submit"
                size={"large"}
                disabled={false}
                className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={() => {
                  setComponentDisabled(false);
                }}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </EventDetailsComponent>
  );
};

export default EventPageView;
