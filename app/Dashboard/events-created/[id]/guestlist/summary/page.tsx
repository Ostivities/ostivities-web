"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { Heading5, Label } from "@/app/components/typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SummaryDataType } from "@/app/utils/interface";
import { Button, Input, Space, Table } from "antd";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";

const { Search } = Input;

function getRandomBuyerName(): string {
  const names = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Brown", "David Wilson"];
  return names[Math.floor(Math.random() * names.length)];
}

const EventsGuestListSummary = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const data: SummaryDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    buyerName: getRandomBuyerName(),
    ticketName: `Ticket ${index + 1}`,
    checkedInBy: `2024-07-${(index + 1).toString().padStart(2, "0")}, ${Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}${Math.random() > 0.5 ? 'am' : 'pm'}`,
  }));

  const columns: ColumnsType<SummaryDataType> = [
    {
      title: (
        <Label
          content="Buyer Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "buyerName",
      sorter: (a, b) => a.buyerName.localeCompare(b.buyerName),
    },
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketName",
      sorter: (a, b) => a.ticketName.localeCompare(b.ticketName),
    },
    {
      title: (
        <Label
          content="Checked in By"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "checkedInBy",
      sorter: (a, b) => new Date(a.checkedInBy).getTime() - new Date(b.checkedInBy).getTime(),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    const formattedExportData = exportData.map((item) => ({
      "Buyer Name": item.buyerName,
      "Ticket Name": item.ticketName,
      "Checked in By": item.checkedInBy,
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "GuestListSummary");
      XLSX.writeFile(wb, "GuestListSummary.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map((item) => Object.values(item)),
      });
      doc.save("GuestListSummary.pdf");
    }
  };

  const filteredData = data.filter((item) =>
    item.buyerName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size="middle" className="w-full">
        <Heading5 className="pb-5" content={"Checked In Summary"} />

        <Space className="w-full justify-between">
          <Search
            placeholder="Search Buyer Name"
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

export default EventsGuestListSummary;
