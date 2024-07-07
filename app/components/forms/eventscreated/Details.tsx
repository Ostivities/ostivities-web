"use client";
import { Label } from "@/app/components/typography/Typography";
import { DataType } from "@/app/utils/interface";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";

const { Search } = Input;

const EventTicketTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Label
          content="Event Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Event Type"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventType",
      sorter: (a, b) => a.eventType.localeCompare(b.eventType),
    },
    {
      title: (
        <Label
          content="Ticket Sold"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketSold",
      sorter: (a, b) => a.ticketSold - b.ticketSold,
    },
    {
      title: (
        <Label
          content="Date Created"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateCreated",
      sorter: (a:any, b:any) => a.dateCreated - b.dateCreated,
    },
    {
      title: (
        <Label
          content="Status"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "status",
      render: (status) => {
        let color;
        if (status === "Active") color = "green";
        else if (status === "Closed") color = "red";
        else if (status === "Pending") color = "orange";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "",
      render: () => (
        <Button
          type="primary"
          shape="round"
          style={{ borderRadius: "15px" }}
        >
          View
        </Button>
      ),
    },
  ];

  const data: DataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: `Event ${index + 1}`,
    eventType: `Type ${index + 1}`,
    ticketSold: Math.floor(Math.random() * 100),
    dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
    status: ["Active", "Closed", "Pending"][
      Math.floor(Math.random() * 3)
    ] as 'Active' | 'Closed' | 'Pending',
  }));

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.eventName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Search events"
          onChange={onSearchChange}
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        className="font-BricolageGrotesqueRegular w-full"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default EventTicketTable;
