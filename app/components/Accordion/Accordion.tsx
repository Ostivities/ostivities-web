"use client";
import { RightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Card, Collapse } from "antd";
import React from "react";

const genExtra = () => (
  <RightOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: null,
    // extra: genExtra(),
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: null,
    // extra: genExtra(),
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: null,
    // extra: genExtra(),
  },
];

const Accordion: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <Collapse
          items={items}
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition="end"
          collapsible="header"
        />
      </div>
      <div className="w-2/3">
        <Card style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    </div>
  );
};

export default Accordion;
