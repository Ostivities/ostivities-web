"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import Shipping from "@/app/components/OstivitiesModal/AddShippingModal";
import { Heading5, Label, Paragraph } from "@/app/components/typography/Typography";
import { Button, Dropdown, Input, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";

export interface IModal {
    visible: boolean; // Add this
    open?: boolean;  // Optional, in case you're toggling modals with different terminology
    onCancel: () => void;
    onOk: () => void;
    data?: any; // Include data if you're passing modal-specific data
  }
  

const { Search } = Input;

const Shippinglist = () => {
  const [shippingSearchText, setShippingSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const shippingData = Array.from({ length: 20 }, (_, index) => ({
    key: `${index + 1}`,
    date: `2024-12-${(index % 30) + 1}`,
    title: `Shipping Method ${index + 1}`,
    description: `Description for Shipping Method ${index + 1}`,
    fee: Math.floor(Math.random() * 1000),
  }));

  const shippingColumns: ColumnsType<typeof shippingData[0]> = [
    {
      title: <Label content="Date" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: <Label content="Shipping Title" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: <Label content="Shipping Description" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "description",
    },
    {
      title: <Label content="Shipping Fee" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "fee",
      sorter: (a, b) => a.fee - b.fee,
      render: (fee) => `₦${fee.toLocaleString()}`,
    },
    {
      title: <Label content="Action" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "action",
      key: "action",
      render: (text: any) => (
        <Space direction="vertical" size="small">
          <Dropdown
            menu={{
              items: [
                {
                  label: (
                    <Button
                      type="link"
                      className="font-BricolageGrotesqueRegular text-sm"
                      style={{ color: "#000000" }}
                    >
                      Delete
                    </Button>
                  ),
                  key: "1",
                },
              ],
            }}
            trigger={["click", "hover"]}
          >
            <MenuOutlined className="cursor-pointer text-lg" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const filteredData = shippingData.filter((item) =>
    item.title.toLowerCase().includes(shippingSearchText.toLowerCase())
  );
  

  return (
    <React.Fragment>
      <EventDetailsComponent>
        <Space direction="vertical" size="middle" className="w-full">
          <Space className="w-full justify-between items-center">
            <Heading5 className="-mb-2" content={"Shipping Method"} />
          </Space>

          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Manage and create your shipping methods here."}
          />
          <Button
            type="primary"
            size="large"
            className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white float-end"
            style={{ borderRadius: "20px", margin: "5px" }}
            onClick={() => setIsModalOpen(true)}
          >
            <PlusOutlined />
            <span className="pl-1">Create Shipping Method</span>
          </Button>

          <Space className="w-full justify-between">
            <Input
              placeholder="Search Shipping Title"
              onChange={(e) => setShippingSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            {selectedRowKeys.length > 0 && (
              <Button
                type="primary"
                danger
                style={{ borderRadius: 15, marginRight: 8 }}
                onClick={() => console.log("Delete selected items")}
              >
                <DeleteOutlined />
              </Button>
            )}
          </Space>

          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            columns={shippingColumns}
            dataSource={filteredData}
            pagination={{
              current: currentPage,
              pageSize,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
            scroll={{ x: "max-content" }}
          />
        </Space>
      </EventDetailsComponent>

      {isModalOpen && (
        <Shipping
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => console.log("Modal Submitted")}
        />
      )}
    </React.Fragment>
  );
};

export default Shippinglist;