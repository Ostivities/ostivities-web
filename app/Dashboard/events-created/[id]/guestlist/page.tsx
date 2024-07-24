"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import GuestDetail from "@/app/components/OstivitiesModal/GuestDetail";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import {
  generateRandomString,
  getRandomEventName,
  getRandomName,
} from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const { Search } = Input;

const EventsGuestList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: getRandomEventName(),
    eventType: getRandomName(),
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

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = data.filter(
    (item) =>
      item.eventName.toLowerCase().includes(searchText) ||
      item.eventType.toLowerCase().includes(searchText)
  );

  const columns = [
    {
      title: "Ticket Name",
      dataIndex: "eventName",
      sorter: (a: SalesDataType, b: SalesDataType) =>
        a.eventName.localeCompare(b.eventName),
    },
    {
      title: "Ticket Quantity",
      dataIndex: "ticketSold",
      sorter: (a: SalesDataType, b: SalesDataType) =>
        a.ticketSold - b.ticketSold,
    },
    {
      title: "Buyer Name",
      dataIndex: "eventType",
      sorter: (a: SalesDataType, b: SalesDataType) =>
        a.eventType.localeCompare(b.eventType),
    },
    {
      title: "Order Number",
      dataIndex: "fees",
      sorter: (a: SalesDataType, b: SalesDataType) => {
        if (a.fees !== undefined && b.fees !== undefined) {
          return a.fees - b.fees;
        }
        return 0;
      },
    },
    {
      title: "Order Date",
      dataIndex: "dateCreated",
      sorter: (a: SalesDataType, b: SalesDataType) =>
        a.dateCreated.localeCompare(b.dateCreated),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: SalesDataType) => (
        <Button
          type="primary"
          onClick={() => handleAction(record)}
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
      "Ticket Name": item.eventName,
      "Ticket Quantity": item.ticketSold,
      "Buyer Name": item.eventType,
      "Order Number": item.fees,
      "Order Date": item.dateCreated,
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Guest List");
      XLSX.writeFile(wb, "Guest List.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map((item) => Object.values(item)),
      });
      doc.save("Guest List.pdf");
    }
  };

  const handleAction = (record: SalesDataType) => {
    setIsModalOpen(true);
    setModalData(record);
  };

  return (
    <React.Fragment>
      <GuestDetail
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        data={modalData}
      />
      <EventDetailsComponent>
        <Space direction="vertical" size={"large"}>
          <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
            <Heading5 className="" content={"Guest List"} />
            <Paragraph
              className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
              content={`${filteredData.length} Guests`}
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
                placeholder="Search Ticket Name or Buyer Name"
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
      </EventDetailsComponent>
    </React.Fragment>
  );
};

export default EventsGuestList;
