/* eslint-disable react/no-unescaped-entities */
"use client";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Answers, Questions } from "@/app/utils/data";
import { IFeatures } from "@/app/utils/interface";
import { RightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Avatar, Card, Collapse, List } from "antd";
import React, { Fragment, useState } from "react";

const data: string[] = [...Questions];

const Accordion: React.FC = () => {
  const [keys, setKeys] = useState<number | any>(0);

  const handleItemClick = (index: any) => {
    setKeys(index);
  };

  const Answer: IFeatures = Answers[keys];

  const avatarStyle: React.CSSProperties = {
    height: "14px",
    width: "14px",
    display: "none",
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex flex-row items-center">
          <Avatar
            style={{
              ...avatarStyle,
            }}
            className={`bg-OWANBE_PRY`}
          />
          <span className="text-sm">
            How do I create an event on Ostivities?
          </span>
        </div>
      ),
      children: (
        <p>
          Creating an event is simple — just navigate to the event section, fill
          in details, and share the joy with attendees.
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex flex-row items-center">
          <Avatar
            style={{
              ...avatarStyle,
            }}
            className={`bg-OWANBE_PRY`}
          />
          <span className="text-sm">
            How can I stay updated on Ostivities's Play Store release?
          </span>
        </div>
      ),
      children: (
        <p>
          Follow our social media and visit our website for updates. Get ready
          to download and dive into cultural festivities! 🎉
          #StayTunedForOstivities
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex flex-row items-center">
          <Avatar
            style={{
              ...avatarStyle,
            }}
            className={`bg-OWANBE_PRY`}
          />
          <span className="text-sm">
            Can I customize my event's privacy settings on Ostivities?
          </span>
        </div>
      ),
      children: (
        <p>
          Customize your event's privacy settings on Ostivities. Whether public
          or Private, you have full control over who joins and sees the details.
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex flex-row items-center">
          <Avatar
            style={{
              ...avatarStyle,
            }}
            className={`bg-OWANBE_PRY`}
          />
          <span className="text-sm">
            Is Ostivities secure, especially for payment transactions?
          </span>
        </div>
      ),
      children: (
        <p>
          Absolutely, we prioritize your security. For paid events, our trusted
          payment system ensures seamless and safe transactions.
        </p>
      ),
    },
    {
      key: "5",
      label: (
        <div className="flex flex-row items-center">
          <Avatar
            style={{
              ...avatarStyle,
            }}
            className={`bg-OWANBE_PRY`}
          />
          <span className="text-sm">
            What happens if my event details change after creation?
          </span>
        </div>
      ),
      children: (
        <p>
          No worries! You can easily update your event details. Keep your
          attendees informed by making necessary changes and ensuring everyone
          is on the same page.
        </p>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="relative py-8 hidden md:hidden lg:block xl:block">
        <div className="w-1/2 py-5">
          <>
            <List
              dataSource={data}
              renderItem={(item, index: any) => (
                <List.Item
                  onClick={() => handleItemClick(index)}
                  actions={[
                    <RightOutlined
                      key="list-loadmore-more"
                      style={{
                        cursor: "pointer",
                        color: keys === index ? "#E20000" : "#FFF2F2",
                      }}
                    />,
                  ]}
                  style={{
                    padding: "24px 16px 24px 16px",
                    background: keys === index ? "#FFF2F2" : "#FFFFFF",
                    borderTopLeftRadius: index === 0 ? "20px" : "0px",
                    borderTopRightRadius: index === 0 ? "20px" : "0px",
                    borderBottomLeftRadius:
                      index === data.length - 1 ? "20px" : "0px",
                    borderBottomRightRadius:
                      index === data.length - 1 ? "20px" : "0px",
                    border: `1px solid ${
                      keys === index ? "#FFF2F2" : "#FFFFFF"
                    }`,
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          height: "24px",
                          width: "24px",
                          background: keys === index ? "#E20000" : "#FFF2F2",
                        }}
                        className={`${
                          keys === index
                            ? "bg-OWANBE_PRY"
                            : "bg-OWANBE_INACTIVE"
                        }`}
                      />
                    }
                    description={<span className="text-black">{item}</span>}
                  />
                </List.Item>
              )}
              style={{
                zIndex: 1000,
                boxShadow: "0px 8px 24px 0px #00000014",
                background: "#FFFFFF",
                border: "1px solid #FFFFFF",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            />
          </>
        </div>
        <div className="w-3/5 card-div">
          <Card
            style={{
              width: "85%",
              height: "500px",
              background: "#FFF2F2",
              borderRadius: "20px",
              textAlign: "center",
            }}
          >
            <div className="w-4/5 float-right flex flex-col space-y-8 pt-4">
              <Heading5
                className={`text-left ${
                  keys > 0 || keys === 0
                    ? "animate-shake transition-all ease-in-out"
                    : ""
                }`}
                content={Answer.title}
              />
              <Paragraph
                className={`text-left font-light font-BricolageGrotesqueLight ${
                  keys > 0 || keys === 0
                    ? "animate-shake transition-all ease-in-out"
                    : ""
                }`}
                content={Answer.content}
              />
            </div>
          </Card>
        </div>
      </div>

      <div className="block md:block lg:hidden xl:hidden">
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={(key: any) => console.log(key)}
          style={{
            zIndex: 1000,
            boxShadow: "0px 8px 24px 0px #00000014",
            background: "#FFFFFF",
            border: "1px solid #FFFFFF",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          expandIconPosition="end"
        />
      </div>
    </Fragment>
  );
};

export default Accordion;
