"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { Heading5, Label } from "@/app/components/typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const EventSales = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: getRandomEventName(),
    eventType: `Type ${index + 1}`,
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
          content="Total Ticket Sold"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketSold",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Total Sales Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "revenue",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Fees"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "fees",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Net Sales Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "sales",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
  ];

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"middle"}>
        <Heading5 className="pb-5" content={"Payment History"} />

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
    </EventDetailsComponent>
  );
};

export default EventSales;
