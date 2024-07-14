"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import {
  generateRandomString,
  getRandomEventName,
  getRandomName,
} from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { Button, Input, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const { Search } = Input;

const EventsGuestList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSearchText(e.target.value);
  };

  const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: getRandomEventName(),
    eventType: getRandomName(),
    ticketSold: Math.floor(Math.random() * 100),
    sales: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 10000),
    fees: Math.floor(Math.random() * 1000),
    dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
    status: ["Active", "Closed", "Pending"][Math.floor(Math.random() * 3)] as
      | "Active"
      | "Closed"
      | "Pending",
    id: generateRandomString(10),
  }));

  const columns: ColumnsType<SalesDataType> = [
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Ticket Quantity"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketSold",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Buyer Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventType",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Order Number"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "fees",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Order Date"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateCreated",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "action",
      sorter: false,
      render: (a, record: SalesDataType) => {
        return (
          <Space direction="horizontal" size={"small"}>
            <Button
              type={"primary"}
              size={"middle"}
              className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-20 rounded-2xl`}
              style={{
                borderRadius: "16px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              onClick={() => {}}
            >
              View
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <Heading5 className="" content={"Guest List"} />
          <Paragraph
            className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
            content={`${data.length} Guests`}
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>

        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <Space
            direction="horizontal"
            align="center"
            size={"middle"}
            style={{ width: "100%" }}
            className="justify-between pt-5"
          >
            <Search
              placeholder="Search"
              onChange={onSearchChange}
              style={{ width: 300 }}
            />

            <Button
              type={"primary"}
              size={"large"}
              className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-32 rounded-2xl`}
              style={{
                borderRadius: "16px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              onClick={() => {}}
            >
              Export
            </Button>
          </Space>

          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            columns={columns}
            dataSource={data}
            className="font-BricolageGrotesqueRegular w-full"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data.length,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
            scroll={{ x: "max-content" }}
          />
        </Space>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventsGuestList;
