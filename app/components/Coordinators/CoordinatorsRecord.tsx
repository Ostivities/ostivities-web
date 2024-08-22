"use client";

import React, { useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { FileExcelOutlined, FilePdfOutlined, MenuOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import { Heading5, Label, Paragraph } from "@/app/components/typography/Typography";
import { ColumnsType } from "antd/es/table";
import {
  getRandomName, getRandomNigerianPhoneNumber,
} from "@/app/utils/helper";
import CoordinatorsDetail from "@/app/components/OstivitiesModal/CoordinatorsDetail";
import { CoordinatorsDataType } from "@/app/utils/interface";
import { MenuItemType } from "antd/es/menu/interface";
import Dropdown from "antd/es/dropdown/dropdown";
import AddCoordinatorsModal from "@/app/components/OstivitiesModal/AddEventCoordinatorModal";
import DeleteEntry from "@/app/components/OstivitiesModal/DeleteEntry";

const { Search } = Input;

const CoordinatorsList = () => {
  const router = useRouter(); // Initialize useRouter

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning" | "detail">();
  const [showNewVendorDetails, setShowNewVendorDetails] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  const roles = ["Ticketing Agent", "Auditor", "Usher"]; // Define the roles

  const data: CoordinatorsDataType[] = Array.from({ length: 50 }, (_, index) => ({
    id: `${index + 1}`, // Add the required 'id' field
    key: `${index + 1}`, // Add a key if used in the Table component
    coordinatorsName: getRandomName(),
    coordinatorsEmail: getRandomName(), // Use the correct field name
    coordinatorsphoneNumber:getRandomNigerianPhoneNumber(),
    coordinatorsRole: roles[Math.floor(Math.random() * roles.length)],
    dateAdded: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
  }));


  const coordinatorsPhoneNumber = getRandomNigerianPhoneNumber();
  console.log(coordinatorsPhoneNumber);

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };


  const handleAction = (record: CoordinatorsDataType) => {
    setIsModalOpen(true);
    setModalData(record);
  };


  const filteredData = data.filter(
    (item) =>
      item.coordinatorsName.toLowerCase().includes(searchText) ||
      item.coordinatorsRole.toLowerCase().includes(searchText)
  );

  const columns: ColumnsType<CoordinatorsDataType> = [
    {
      title: "Coordinator's Name", // Correct title if needed
      dataIndex: "coordinatorsName", // Ensure dataIndex matches
      sorter: (a, b) => a.coordinatorsName.localeCompare(b.coordinatorsName),
    },
    {
      title: "Role",
      dataIndex: "coordinatorsRole", // Ensure dataIndex matches
      filters: [
        { text: "Ticketing Agent", value: "Ticketing Agent" },
        { text: "Auditor", value: "Auditor" },
        { text: "Usher", value: "Usher" },
      ],
      onFilter: (value, record) => record.coordinatorsRole.includes(value as string), // Ensure property name matches
      sorter: (a, b) => a.coordinatorsRole.localeCompare(b.coordinatorsRole), // Ensure property name matches
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      sorter: (a, b) => a.dateAdded.localeCompare(b.dateAdded),
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
      render: (text: any, record: CoordinatorsDataType) => (
        <Space direction="vertical" size="small">
          <Dropdown
            menu={{
              items: GuestItems,
            }}
            trigger={["click"]}
          >
            <MenuOutlined className="cursor-pointer text-lg" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const GuestItems: MenuItemType[] = [
    {
    label: (
      <Button
        type="link"
        className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
        style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
        onClick={() => {
          setIsModalOpen(true);
          setActionType("detail");
        }}
      >
        View
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
            setIsModalOpen(true);
            setActionType("delete");
          }}
        >
          Delete
        </Button>
      ),
      key: "3",

      
    },
  ];

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    const formattedExportData = exportData.map((item) => ({
      "Coordinator Name": item.coordinatorsName, // Corrected property name
      "Coordinator Email": item.coordinatorsEmail, // Corrected property name
      "Coordinator Phone Number": item.coordinatorsphoneNumber, // Corrected property name
      "Date Added": item.dateAdded,
      "Role": item.coordinatorsRole, // Corrected property name
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Coordinators List");
      XLSX.writeFile(wb, "Coordinators List.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map((item) => Object.values(item)),
      });
      doc.save("Coordinators List.pdf");
    }
  };

  return (
    <React.Fragment>
        {isModalOpen && actionType === "detail" && (
        <CoordinatorsDetail
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          data={modalData}
        />
      )}
      {/* Render the DeleteEntryModal based on the isModalOpen state */}
      {isModalOpen && actionType === "delete" && (
        <DeleteEntry
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => {
            // Perform delete action here if needed
            setIsModalOpen(false); // Close the modal after delete
          }}
          actionType={actionType}
        />
      )}

      <AddCoordinatorsModal
        open={showNewVendorDetails}
        onCancel={() => setShowNewVendorDetails(false)}
        onOk={() => {
          // handle modal OK action if needed
        }}
      />

      <Space direction="vertical" size={"large"}>
        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
          >
            <Heading5 className="" content={"Coordinators"} />
            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-40 rounded-2xl float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                margin: '10px'
              }}
              onClick={() => setShowNewVendorDetails(true)}
            >
              Add Coordinators
            </Button>
          </div>
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Add and manage coordinators for your event."}
            styles={{ fontWeight: "normal !important" }}
          />
          <Paragraph
            className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
            content={`${filteredData.length} Coordinators`}
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space
            direction="horizontal"
            align="center"
            size="middle"
            style={{ width: "100%" }}
            className="justify-between pt-5"
          >
            <Search
              placeholder="Search Coordinators Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            {selectedRowKeys.length > 0 && (
              <Space>
                <Button
                    type="default"
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    style={{ borderRadius: 15, marginRight: 8 }}
                    onClick={() => handleExport("excel")}
                  >
                    <FileExcelOutlined />
                  </Button>
                  <Button
                    type="default"
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    style={{ borderRadius: 15 }}
                    onClick={() => handleExport("pdf")}
                  >
                    <FilePdfOutlined />
                  </Button>
              </Space>
            )}
          </Space>
          <Table
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            columns={columns}
            dataSource={filteredData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData.length,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
            }}
            scroll={{ x: 1000 }}
          />
        </Space>
      </Space>
    </React.Fragment>
  );
};

export default CoordinatorsList;
