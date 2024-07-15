"use client";
import { Button, Input, Space, Table } from "antd";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import H4 from "../atoms/H4";
import data from "@/app/lib/data/index.json";

const { Search } = Input;

interface BillingDataType {
  key: number;
  invoiceDate: string;
  invoiceId: string;
  amount: number;
}

const Billing = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const billingData: BillingDataType[] = data.billingData.map((item, index) => ({
    key: index,
    invoiceDate: item.invoiceDate,
    invoiceId: item.invoiceId,
    amount: parseFloat(item.invoiceAmount.replace(/[^0-9.-]+/g, "")),
  }));

  const columns = [
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      sorter: (a: BillingDataType, b: BillingDataType) => new Date(a.invoiceDate).getTime() - new Date(b.invoiceDate).getTime(),
    },
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      sorter: (a: BillingDataType, b: BillingDataType) => a.invoiceId.localeCompare(b.invoiceId),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: BillingDataType, b: BillingDataType) => a.amount - b.amount,
      render: (text: number) => `₦${text.toLocaleString()}`,
    },
  ];

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? billingData.filter((item) => selectedRowKeys.includes(item.key))
      : billingData;

    const formattedExportData = exportData.map((item) => ({
      "Invoice Date": item.invoiceDate,
      "Invoice ID": item.invoiceId,
      "Amount": item.amount,
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Billing Data");
      XLSX.writeFile(wb, "Billing Data.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map(item => Object.values(item)),
        didDrawCell: (data: { column: { index: number }; cell: { styles: { fillColor: string } }; }) => {
          if (data.column.index === 0) {
            data.cell.styles.fillColor = "#e20000";
          }
        },
      });
      doc.save("Billing Data.pdf");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = billingData.filter(item =>
    item.invoiceId.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="mx-auto md:max-w-[95%] flex flex-col h-[60dvh]">
      <div className="flex justify-between items-center px-4 my-6">
        <H4 content="Your Invoices" />
      </div>
      <div className="flex justify-between items-center px-4 mb-6">
        <Search
          placeholder="Search Invoice ID"
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
      </div>
      <div className="px-4">
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
      </div>
    </div>
  );
};

export default Billing;
