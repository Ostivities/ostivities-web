"use client";
import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import AddEventCoordinatorModal from "@/app/components/OstivitiesModal/AddEventCoordinatorModal";
import CoordinatorsIcon from "../Icons/CoordinatorsIcon";
import { Heading5, Paragraph } from "../typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Table, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect, useMemo } from "react";

const Coordinators = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<SalesDataType[]>([]);



  return (
    <React.Fragment>
      <AddEventCoordinatorModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />

    <Space direction="vertical" size={"large"}>
      <Space direction="vertical" size={"small"}>
        <Heading5 className="" content={"Event Coordinators"} />
        <Paragraph
          className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
          content={"Add event coordinators to manage your event."}
          styles={{ fontWeight: "normal !important" }}
        />
      </Space>

      <div className="border-dashed border border-OWANBE_DARK h-80 pt-9 pb-9 rounded-lg w-3/4 mx-auto my-5 flex flex-col items-center space-y-8">
        <div className="w-1/2 mx-auto text-center flex flex-row items-center justify-center">
          <CoordinatorsIcon />
        </div>

        <Space
          direction="vertical"
          size={"small"}
          className="mx-auto"
          style={{ width: "75%" }}
          align="center"
        >
          <Heading5 className="text-center" content={"Event Coordinators"} />
          <Paragraph
            className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center"
            content={
              "Add event coordinators to manage your event."
            }
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>

        <div className="w-1/2 mx-auto text-center">
          <Button
            type={"primary"}
            size="large"
            className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-45 rounded-2xl`}
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Add Coordinators
          </Button>
        </div>
      </div>
    </Space>
    </React.Fragment>
  );
};

export default Coordinators;
