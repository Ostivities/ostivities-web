"use client";
import { Label } from "@/app/components/typography/Typography";
import "@/app/globals.css";
import { generateRandomString } from "@/app/utils/helper";
import { DataType } from "@/app/utils/interface";
import DeleteTicket from "@/app/components/OstivitiesModal/DeleteEvent";
import {
  DeleteOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const { Search } = Input;

const EventsCreatedTable: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();

  const data: DataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: `Event ${index + 1}`,
    eventType: `Type ${index + 1}`,
    ticketSold: Math.floor(Math.random() * 100),
    dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
    status: ["Active", "Closed", "Pending"][Math.floor(Math.random() * 3)] as
      | "Active"
      | "Closed"
      | "Pending",
    id: generateRandomString(10),
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
        { text: "Type 1", value: "Type 1" },
        { text: "Type 2", value: "Type 2" },
        { text: "Type 3", value: "Type 3" },
        // Add more types as needed
      ],
      onFilter: (value, record) => record.eventType.includes(value as string),
    },
    {
      title: (
        <Label
          content="Tickets Sold"
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
      sorter: (a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
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
        { text: "Active", value: "Active" }, 
        { text: "Closed", value: "Closed" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (status) => {
        let style = {};
        let dotColor = "";
    
        if (status === "Active") {
          style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
          dotColor = "#009A44";
        } else if (status === "Closed") {
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
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "",
      render: (text: any, record: DataType) => (
        <Button
          type="primary"
          shape="round"
          style={{
            borderRadius: "25px",
            backgroundColor: "#e20000",
            borderColor: "#e20000",
            minWidth: "70px",
            padding: "4px",
          }}
          onClick={() =>
            router.push(`/Dashboard/events-created/${record.id}/about`)
          }
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

    // Prepare data for export without 'id' column
    const dataToExport = exportData.map(({ id, ...rest }) => rest);

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFile(wb, "EventsCreated.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(dataToExport[0])],
        body: dataToExport.map((item) => Object.values(item)),
        didDrawCell: (data: {
          column: { index: number };
          cell: { styles: { fillColor: string } };
        }) => {
          if (data.column.index === 0) {
            data.cell.styles.fillColor = "#e20000";
          }
        },
      });
      doc.save("EventsCreated.pdf");
    }
  };

  return (
    <React.Fragment>
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => setIsShown(false)}
        actionType={actionType}
      />
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
                setIsShown(true);
                setActionType("delete");
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
    </React.Fragment>
  );
};

export default EventsCreatedTable;