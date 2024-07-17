import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import { getRandomName } from "@/app/utils/helper";
import { SummaryDataType } from "@/app/utils/interface";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Table } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Heading5, Label } from "../typography/Typography";

const DiscountRecord = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const GuestItems: MenuItemType[] = [
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{
            color: "#000000",
            fontFamily: "BricolageGrotesqueRegular",
          }}
          //   onClick={() => setIsOpen(true)}
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
          style={{
            color: "#000000",
            fontFamily: "BricolageGrotesqueRegular",
          }}
          onClick={() => {
            // setIsShown(true);
            // setActionType("warning");
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
          style={{
            color: "#000000",
            fontFamily: "BricolageGrotesqueRegular",
          }}
          onClick={() => {
            // setIsShown(true);
            // setActionType("delete");
          }}
        >
          Delete
        </Button>
      ),
      key: "3",
    },
  ];

  const data: SummaryDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    buyerName: getRandomName(),
    ticketName: `Ticket ${index + 1}`,
    checkedInBy: `2024-07-${(index + 1)
      .toString()
      .padStart(2, "0")}, ${Math.floor(Math.random() * 12)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")}${Math.random() > 0.5 ? "am" : "pm"}`,
  }));

  const filteredData = data.filter((item) =>
    item.buyerName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<SummaryDataType> = [
    {
      title: (
        <Label
          content="Discount Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "buyerName",
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
    },
    {
      title: (
        <Label
          content="Users"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketName",
      sorter: (a, b) => a.ticketName.localeCompare(b.ticketName),
    },
    {
      title: (
        <Label
          content="Date ending"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "checkedInBy",
      sorter: (a, b) =>
        new Date(a.checkedInBy).getTime() - new Date(b.checkedInBy).getTime(),
    },
    {
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "action",
      key: "action",
      render: (text: any, record: SummaryDataType) => (
        <Space direction="vertical" size="small">
          <Dropdown
            menu={{
              items: GuestItems,
              //   onClick: handleMenuClick(key.toString()),
            }}
            trigger={["click", "hover"]}
          >
            <MenuOutlined className="cursor-pointer text-lg" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Space direction="vertical" size={"large"} className="w-full">
      <Heading5 className="pb-5" content={"Discount Code"} />

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
  );
};

export default DiscountRecord;
