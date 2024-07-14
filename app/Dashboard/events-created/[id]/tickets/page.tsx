"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import AddTicketModal from "@/app/components/OstivitiesModal/AddTicket";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import { generateRandomString } from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const EventTickets = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const GuestItems: MenuProps["items"] = [
    {
      label: (
        <span className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK">
          Edit
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK">
          Duplicate
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK">
          Delete
        </span>
      ),
      key: "3",
    },
  ];

  const eventNames = [
    "Music Concert",
    "Art Exhibition",
    "Tech Conference",
    "Food Festival",
    "Sports Meet",
    "Charity Gala",
    "Comedy Show",
    "Theater Play",
    "Film Screening",
    "Book Fair",
  ];

  // Function to get a random event name from the array
  const getRandomEventName = () =>
    eventNames[Math.floor(Math.random() * eventNames.length)];

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
          content="Total Price"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "revenue",
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
      render: (text: any, record: SalesDataType) => {
        return (
          <Space direction="vertical" size={"small"}>
            <Dropdown menu={{ items: GuestItems }}>
              <MenuOutlined className="cursor-pointer text-lg" />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <AddTicketModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      <EventDetailsComponent>
        <Space direction="vertical" size={"large"}>
          <Space direction="vertical" size={"small"}>
            <Heading5 className="" content={"Event Ticket "} />
            <Paragraph
              className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
              content={
                "Ostivities is free for free events. For paid events, we charge a percentage as a transaction fee."
              }
              styles={{ fontWeight: "normal !important" }}
            />
          </Space>

          <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
            <Button
              type={"primary"}
              size={"large"}
              className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-32 rounded-2xl float-end`}
              style={{
                borderRadius: "16px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Add Ticket
            </Button>
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
    </React.Fragment>
  );
};

export default EventTickets;
