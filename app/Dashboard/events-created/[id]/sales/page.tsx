"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { Heading5, Label } from "@/app/components/typography/Typography";
import { generateRandomString } from "@/app/utils/helper";
import { SalesDataType } from "@/app/utils/interface";
import { Button, Input, Space, Table } from "antd";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";

const { Search } = Input;

const EventSales = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const eventNames = [
    "Music Concert",
    "Art Exhibition",
    "Tech Conference",
    "Food Festival",
    "Sports Meet",
    "Charity Gala",
    "Comedy Show",
    "Theater Play",
    "Film Screening",
    "Book Fair",
  ];

  const getRandomEventName = () =>
    eventNames[Math.floor(Math.random() * eventNames.length)];

  const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: getRandomEventName(),
    eventType: `Type ${index + 1}`,
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

  const columns: ColumnsType<SalesDataType> = [
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Total Ticket Sold"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketSold",
      sorter: (a, b) => a.ticketSold - b.ticketSold,
    },
    {
      title: (
        <Label
          content="Total Sales Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "revenue",
      sorter: (a, b) => (a.revenue ?? 0) - (b.revenue ?? 0),
      render: text => `₦${text.toLocaleString()}`,
    },
    {
      title: (
        <Label
          content="Fees"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "fees",
      sorter: (a, b) => (a.fees ?? 0) - (b.fees ?? 0),
      render: text => `₦${text.toLocaleString()}`,
    },
    {
      title: (
        <Label
          content="Net Sales Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "sales",
      sorter: (a, b) => (a.sales ?? 0) - (b.sales ?? 0),
      render: text => `₦${text.toLocaleString()}`,
    },
  ];

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    const formattedExportData = exportData.map(item => ({
      "Ticket Name": item.eventName,
      "Total Ticket Sold": item.ticketSold,
      "Total Sales Revenue": item.revenue,
      "Fees": item.fees,
      "Net Sales Revenue": item.sales,
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Payment History");
      XLSX.writeFile(wb, "Payment History.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map(item => Object.values(item)),
        didDrawCell: (data: {
          column: { index: number };
          cell: { styles: { fillColor: string } };
        }) => {
          if (data.column.index === 0) {
            data.cell.styles.fillColor = "#e20000";
          }
        },
      });
      doc.save("Payment History.pdf");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter(item =>
    item.eventName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size="middle" className="w-full">
        <Heading5 className="pb-5" content={"Payment History"} />
        <Space className="w-full justify-between">
          <Search
            placeholder="Search Ticket Name"
            onChange={handleSearch}
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
    </EventDetailsComponent>
  );
};

export default EventSales;
