"use client";

import React, { useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import GuestDetail from "@/app/components/OstivitiesModal/GuestDetail";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { ColumnsType } from "antd/es/table";

import {
  generateRandomString,
  getRandomEventName,
  getRandomName,
} from "@/app/utils/helper";
import { VendorDataType } from "@/app/utils/interface";
import VendorsDetails from "@/app/Dashboard/events-created/[id]/coordinators/vendors/vendorsdetails/page";
import NewVendorsDetails from "@/app/Dashboard/events-created/[id]/coordinators/vendors/newvendorsdetails/page";

const { Search } = Input;

const VendorsList = () => {
  const router = useRouter(); // Initialize useRouter

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  const [showVendorDetails, setShowVendorDetails] = useState<boolean>(false);
  const [showNewVendorDetails, setShowNewVendorDetails] = useState<boolean>(false);

  const data: VendorDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    vendorName: getRandomName(),
    category: getRandomEventName(),
    dateApplied: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
    status: ["Approved", "Declined", "Pending"][
      Math.floor(Math.random() * 3)
    ] as "Approved" | "Declined" | "Pending",
    id: generateRandomString(10),
  }));

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = data.filter(
    (item) =>
      item.vendorName.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText)
  );

  const columns: ColumnsType<VendorDataType> = [
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      sorter: (a: VendorDataType, b: VendorDataType) =>
        a.vendorName.localeCompare(b.vendorName),
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        { text: "Event A", value: "Event A" },
        { text: "Event B", value: "Event B" },
        { text: "Event C", value: "Event C" },
        // Add more categories as needed
      ],
      onFilter: (value, record) => record.category.includes(value as string),
      sorter: (a: VendorDataType, b: VendorDataType) =>
        a.category.localeCompare(b.category),
    },
    {
      title: "Date Applied",
      dataIndex: "dateApplied",
      sorter: (a: VendorDataType, b: VendorDataType) =>
        a.dateApplied.localeCompare(b.dateApplied),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Approved", value: "Approved" },
        { text: "Declined", value: "Declined" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      sorter: (a: VendorDataType, b: VendorDataType) =>
        a.status.localeCompare(b.status),
      render: (status: string) => {
        let style = {};
        let dotColor = "";

        if (status === "Approved") {
          style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
          dotColor = "#009A44";
        } else if (status === "Declined") {
          style = { color: "#D30000", backgroundColor: "#FFD3D3" }; // Red
          dotColor = "#D30000";
        } else if (status === "Pending") {
          style = { color: "#F68D2E", backgroundColor: "#FDE8D5" }; // Orange
          dotColor = "#F68D2E";
        }
        return (
          <span
            style={{
              ...style,
              padding: "2px 10px",
              borderRadius: "25px",
              fontWeight: "500", // Adjusted to "500" for medium weight
              display: "inline-block",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: dotColor,
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
            ></span>
            {status}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: VendorDataType) => (
        <Button
          type="primary"
          onClick={() => setShowVendorDetails(true)}
          style={{ borderRadius: "20px" }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    const formattedExportData = exportData.map((item) => ({
      "Vendor Name": item.vendorName,
      "Category": item.category,
      "Date Applied": item.dateApplied,
      "Status": item.status,
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Vendors List");
      XLSX.writeFile(wb, "Vendors List.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map((item) => Object.values(item)),
      });
      doc.save("Vendors List.pdf");
    }
  };

  return (
    <React.Fragment>
      {
        !showVendorDetails && !showNewVendorDetails && (
          <>
            <GuestDetail
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              data={modalData}
            />
            <Space direction="vertical" size={"large"}>
              <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Heading5 className="" content={"Vendors"} />
                  <Button
                    type="primary"
                    size="large"
                    className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-32 rounded-2xl float-end"
                    style={{
                      borderRadius: "20px",
                      fontFamily: "BricolageGrotesqueMedium",
                    }}
                    onClick={() => setShowNewVendorDetails(true)}
                  >
                    Add Vendor
                  </Button>
                </div>
                <Paragraph
                  className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
                  content={"Add and manage vendors for your event."}
                  styles={{ fontWeight: "normal !important" }}
                />
                <Paragraph
                  className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
                  content={`${filteredData.length} Vendors`}
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
                    placeholder="Search Vendor Name or Category"
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
                  scroll={{ x: "max-content" }}
                />
              </Space>
            </Space>
          </>
        )
      }
      {
        showNewVendorDetails && (
          <NewVendorsDetails />
        )
      }
      {
        showVendorDetails && (
          <VendorsDetails />
        )
      }
    </React.Fragment>
  );
};

export default VendorsList;
