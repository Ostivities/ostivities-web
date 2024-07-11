"use client";
import { Label } from "@/app/components/typography/Typography";
import { DataType } from "@/app/utils/interface";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import "@/app/globals.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DeleteOutlined, FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";

const { Search } = Input;

const EventTicketTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const data: DataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: `Event ${index + 1}`,
    eventType: `Type ${index + 1}`,
    ticketSold: Math.floor(Math.random() * 100),
    dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
    status: ["Active", "Closed", "Pending"][
      Math.floor(Math.random() * 3)
    ] as 'Active' | 'Closed' | 'Pending',
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Label
          content="Event Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Event Type"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventType",
      sorter: (a, b) => a.eventType.localeCompare(b.eventType),
      filters: [
        { text: 'Type 1', value: 'Type 1' },
        { text: 'Type 2', value: 'Type 2' },
        { text: 'Type 3', value: 'Type 3' },
        // Add more types as needed
      ],
      onFilter: (value, record) => record.eventType.includes(value as string),
    },
    {
      title: (
        <Label
          content="Ticket Sold"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketSold",
      sorter: (a, b) => a.ticketSold - b.ticketSold,
    },
    {
      title: (
        <Label
          content="Date Created"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "dateCreated",
      sorter: (a: any, b: any) => a.dateCreated - b.dateCreated,
    },
    {
      title: (
        <Label
          content="Status"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "status",
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Closed', value: 'Closed' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (status) => {
        let color;
        if (status === "Active") color = "green";
        else if (status === "Closed") color = "red";
        else if (status === "Pending") color = "orange";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "",
      render: () => (
        <Button
          type="primary"
          shape="round"
          style={{ borderRadius: "15px", backgroundColor: "#e20000", borderColor: "#e20000" }}
        >
          View
        </Button>
      ),
    },
  ];

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.eventName.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasSelected = selectedRowKeys.length > 0;

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, "EventsCreated.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      doc.autoTable({
        head: [Object.keys(exportData[0])],
        body: exportData.map((item) => Object.values(item)),
        didDrawCell: (data: { column: { index: number; }; cell: { styles: { fillColor: string; }; }; }) => {
          if (data.column.index === 0) {
            data.cell.styles.fillColor = '#e20000';
          }
        },
      });
      doc.save("EventsCreated.pdf");
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Search events"
          onChange={onSearchChange}
          style={{ width: 300 }}
        />
        {hasSelected && (
          <div>
            <Button
              type="primary"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button"
              danger
              style={{ borderRadius: 15, marginRight: 8 }}
              onClick={() => {
                // Handle delete logic here
                console.log("Delete selected:", selectedRowKeys);
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              type="default"
              className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold"
              style={{ borderRadius: 15, marginRight: 8 }}
              onClick={() => handleExport("excel")}
            >
              <FileExcelOutlined />
            </Button>
            <Button
              type="default"
              className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold"
              style={{ borderRadius: 15 }}
              onClick={() => handleExport("pdf")}
            >
              <FilePdfOutlined />
            </Button>
          </div>
        )}
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
    </div>
  );
};

export default EventTicketTable;
