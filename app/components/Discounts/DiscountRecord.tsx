import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import { getRandomName } from "@/app/utils/helper";
import { DiscountDataType } from "@/app/utils/interface"; // Import the new interface
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Table } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import DeleteTicket from "../OstivitiesModal/DeleteTicket";
import { Heading5, Label } from "../typography/Typography";

const DiscountRecord = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();

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

  const data: DiscountDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    discountCode: `DISCOUNT${index + 1}`,
    uses: `${Math.floor(Math.random() * 100)} uses`,
    dateEnding: `2023-10-${(index + 1)
      .toString()
      .padStart(2, "0")}, ${Math.floor(Math.random() * 12)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")}${Math.random() > 0.5 ? "am" : "pm"}`,
  }));

  const filteredData = data.filter((item) =>
    item.discountCode.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<DiscountDataType> = [
    {
      title: (
        <Label
          content="Discount Code"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "discountCode",
      sorter: (a, b) => a.discountCode.localeCompare(b.discountCode),
    },
    {
      title: (
        <Label
          content="Uses"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "uses",
      sorter: (a, b) => a.uses.localeCompare(b.uses),
    },
    {
      title: (
        <Label
          content="Date Ending"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateEnding",
      sorter: (a, b) =>
        new Date(a.dateEnding).getTime() - new Date(b.dateEnding).getTime(),
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
      render: (text: any, record: DiscountDataType) => (
        <Space direction="vertical" size="small">
          <Dropdown
            menu={{
              items: GuestItems,
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
    <React.Fragment>
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => setIsShown(false)}
        actionType={actionType}
      />
      <Space direction="vertical" size={"large"} className="w-full">
        <Heading5 className="pb-5" content={"Discount Code"} />

        <Space direction="vertical" size={"large"} className="w-full">
          <div className="flex flex-row items-center justify-end">
            <Button
              type="default"
              size={"large"}
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              onClick={() => toggleDiscount("Discount_Code")}
            >
              Create Discount
            </Button>
          </div>

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
    </React.Fragment>
  );
};

export default DiscountRecord;
