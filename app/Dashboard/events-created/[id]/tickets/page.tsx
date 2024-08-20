"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import AddTicketModal from "@/app/components/OstivitiesModal/AddTicket";
import DeleteTicket from "@/app/components/OstivitiesModal/DeleteTicket";
import UpdateTicket from "@/app/components/OstivitiesModal/UpdateTicket";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Table, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect, useMemo } from "react";

// Currency formatter for Naira (₦)
const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

const EventTickets = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<SalesDataType[]>([]);

  const data: SalesDataType[] = useMemo(() =>
    Array.from({ length: 50 }, (_, index) => ({
      key: `${index + 1}`,
      eventName: getRandomEventName(),
      eventType: `Type ${index + 1}`,
      ticketSold: Math.floor(Math.random() * 100),
      revenue: Math.floor(Math.random() * 10000),
      dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
      status: ["Active", "Closed", "Pending"][Math.floor(Math.random() * 3)] as
        | "Active"
        | "Closed"
        | "Pending",
      id: generateRandomString(10),
    }))
  , []);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.eventName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  interface MenuItemType {
    label: React.ReactNode;
    key: string;
  }

  const GuestItems: MenuItemType[] = [
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
      ),
      key: "1",
    },
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={() => {
            setIsShown(true);
            setActionType("warning");
          }}
        >
          Duplicate
        </Button>
      ),
      key: "2",
    },
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={() => {
            setIsShown(true);
            setActionType("delete");
          }}
        >
          Delete
        </Button>
      ),
      key: "3",
    },
  ];

  const handleMenuClick = (key: string) => {
    // Handle menu item clicks
    console.log("Clicked on:", key);
  };

  const columns: ColumnsType<SalesDataType> = [
    {
      title: <Label content="Ticket Name" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: <Label content="Ticket Quantity" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "ticketSold",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: <Label content="Ticket Price" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "revenue",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
      render: (revenue: number) => <span>{formatCurrency(revenue)}</span>,
    },
    {
      title: <Label content="Action" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "action",
      key: "action",
      render: (text: any, record: SalesDataType) => (
        <Space direction="vertical" size="small">
          <Dropdown
            overlay={
              <Menu onClick={({ key }) => handleMenuClick(key.toString())}>
                {GuestItems.map((item) => (
                  <Menu.Item key={item.key}>{item.label}</Menu.Item>
                ))}
              </Menu>
            }
            trigger={["click"]}
          >
            <MenuOutlined className="cursor-pointer text-lg" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <AddTicketModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      <UpdateTicket 
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
      />
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => setIsShown(false)}
        actionType={actionType}
      />
      <EventDetailsComponent>
        <Space direction="vertical" size="large">
          <Space direction="vertical" size="small">
            <Heading5 className="" content={"Event Ticket "} />
            <Paragraph
              className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
              content="For free events, Ostivities is free. For paid events, we charge a percentage-based transaction fee on ticket sales."
              styles={{ fontWeight: "normal !important" }}
            />
          </Space>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium", 
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Add Tickets 
            </Button>
            <Input.Search
              placeholder="Search tickets"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginBottom: 16, width: 300 }}
            />
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }}
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
              scroll={{ x: "max-content" }}
            />
          </Space>
        </Space>
      </EventDetailsComponent>
    </React.Fragment>
  );
};

export default EventTickets;