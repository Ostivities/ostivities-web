import { Label } from "@/app/components/typography/Typography";
import { DataType } from "@/app/utils/interface";
import AddTicketModal from "@/app/components/OstivitiesModal/AddTicket";
import DeleteTicket from "@/app/components/OstivitiesModal/DeleteTicket"; 
import UpdateTicket from "@/app/components/OstivitiesModal/UpdateTicket";

import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, MenuProps, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import EventDetailsComponent from "../EventDetails/EventDetails";

// Currency formatter for Naira (₦)
const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

const EventTicketTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();

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

  const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
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
  }));

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

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-32 rounded-2xl float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Add Tickets
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
    </React.Fragment>
  );
};

export default EventTicketTable;
