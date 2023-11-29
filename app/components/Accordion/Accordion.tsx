"use client";
import { Answers, Questions } from "@/app/utils/data";
import { IFeatures } from "@/app/utils/interface";
import { RightOutlined } from "@ant-design/icons";
import { Avatar, Card, List } from "antd";
import React, { useState } from "react";
import { Heading5, Paragraph } from "../typography/Typography";

const data: string[] = [...Questions];

const Accordion: React.FC = () => {
  const [keys, setKeys] = useState<number | any>(0);

  const handleItemClick = (index: any) => {
    setKeys(index);
  };

  const Answer: IFeatures = Answers[keys];

  return (
    <div className="relative py-8">
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
            <Heading5 className="text-left" content={Answer.title} />
            <Paragraph
              className="text-left font-light font-BricolageGrotesqueLight"
              content={Answer.content}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Accordion;
