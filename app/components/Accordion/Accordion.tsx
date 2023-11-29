"use client";
import { Questions } from "@/app/utils/data";
import { RightOutlined } from "@ant-design/icons";
import { Avatar, Card, List, Typography } from "antd";
import React, { useState } from "react";
import { Heading5, Paragraph } from "../typography/Typography";

const genExtra = () => (
  <RightOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const data: string[] = [...Questions];

const Accordion: React.FC = () => {
  const [keys, setKeys] = useState<number | any>(0);

  const handleItemClick = (index: any) => {
    setKeys(index);
  };
  return (
    <div className="relative py-8">
      <div className="w-1/2 py-5">
        <>
          <List
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            // bordered
            dataSource={data}
            // rowKey={(item: any) => React.Key}
            renderItem={(item, index: any) => (
              <List.Item
                onClick={() => handleItemClick(index)}
                actions={[
                  <RightOutlined
                    key="list-loadmore-more"
                    style={{ cursor: "pointer" }}
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
                  border: `1px solid ${keys === index ? "#FFF2F2" : "#FFFFFF"}`,
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        height: "24px",
                        width: "24px",
                      }}
                      className={`${
                        keys === index ? "bg-OWANBE_PRY" : "bg-OWANBE_INACTIVE"
                      }`}
                    />
                  }
                  description={item}
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
              className="text-left"
              content="What happens if my event details change after creation?"
            />
            <Paragraph
              className="text-left font-light font-BricolageGrotesqueLight"
              content=" No worries! You can easily update your event details. Keep your
            attendees informed by making necessary changes and ensuring everyone
            is on the same page."
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Accordion;
