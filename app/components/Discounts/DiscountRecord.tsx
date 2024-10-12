import { getRandomName } from "@/app/utils/helper";
import { DiscountDataType, IDiscountData } from "@/app/utils/interface"; // Import the new interface
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Table } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useGetEventDiscount } from "@/app/hooks/discount/discount.hook"; 
import { useRouter, useParams } from "next/navigation";
import DeleteDiscount from "../OstivitiesModal/DeleteDiscount";
import { Heading5, Label, Paragraph } from "../typography/Typography";
import { USAGE_LIMIT } from "@/app/utils/enums";

const DiscountRecord = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getEventDiscount } = useGetEventDiscount(params?.id);
  console.log(selectedRowKeys, "selectedRowKeys");
  const eventDiscountDetails = getEventDiscount?.data?.data?.data;
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

  const data: IDiscountData[] = eventDiscountDetails?.map(
    (item: IDiscountData) => {
      return {
        key: item?.id,
        discountCode: item?.discountCode,
        uses: item?.usageLimit,
        dateEnding: item?.endDateAndTime,
      };
    }
  );

  const filteredData = data?.filter((item) =>
    item?.discountCode?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<IDiscountData> = [
    {
      title: (
        <Label
          content="Discount Code"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "discountCode",
      sorter: (a, b) => a?.discountCode?.localeCompare(b?.discountCode),
    },
    {
      title: (
        <Label
          content="Uses"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "uses",
      render: (text, record: IDiscountData) => {
        return record?.uses === USAGE_LIMIT.MULTIPLE ? "Unlimited" : "Once";
      }
      // sorter: (a, b) => a.uses.localeCompare(b.uses),
    },
    {
      title: (
        <Label
          content="Date Ending"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateEnding",
      render: (text) => {
        return `${dateFormat(text)} ${timeFormat(text)}`;
      },
      // sorter: (a, b) =>
      //   new Date(a.dateEnding).getTime() - new Date(b.dateEnding).getTime(),
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
      render: (text: any, record: IDiscountData) => (
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
      <DeleteDiscount
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => {
          setIsShown(false);
          getEventDiscount.refetch();
        }}
        id={selectedRowKeys}
        actionType={actionType}
      />

      <Space direction="vertical" size={"small"}>
        <Heading5 className="" content={"Discounts "} />
        <Paragraph
          className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
          content={"Generate discount codes and implement automatic discounts."}
          styles={{ fontWeight: "normal !important" }}
        />

        <Space direction="vertical" size={"large"} className="w-full">
          <div className="flex flex-row items-center justify-end">
            <Button
              type="default"
              size={"large"}
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              onClick={() =>
                router.push(
                  `/Discover/events-created/${params?.id}/tickets/create-discount`
                )
              }
            >
              Create Discount
            </Button>
          </div>

          <Table
          loading={getEventDiscount?.isFetching} 

            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  if (record?.key !== undefined) {
                    setSelectedRowKeys([record.key]);
                  }
                },
              };
            }}
            columns={columns}
            dataSource={filteredData}
            className="font-BricolageGrotesqueRegular w-full"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData?.length,
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
