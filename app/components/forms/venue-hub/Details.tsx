import { Label } from "@/app/components/typography/Typography";
import "@/app/globals.css";
import { generateRandomString } from "@/app/utils/helper";
import { DataType } from "@/app/utils/interface";
import DeleteTicket from "@/app/components/OstivitiesModal/DeleteEvent";
import { DeleteOutlined, FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const { Search } = Input;

interface VenueDataType {
  key: string;
  venueName: string;
  location: string;
  capacity: "Small" | "Medium" | "Large";
  venueType: "Halls" | "Outdoor" | "Conference Rooms";
  ratings: number; // Assume ratings are from 1 to 5
  status: "Available" | "Unavailable" ;
  id: string;
}

const VenueHubTable: React.FC = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();

  // Sample data for 50 venues
  const data: VenueDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    venueName: `Venue ${index + 1}`,
    location: ["Lagos", "Abuja", "Kano", "Enugu", "Kaduna"][Math.floor(Math.random() * 5)],
    capacity: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)] as
      | "Small"
      | "Medium"
      | "Large",
    venueType: ["Halls", "Outdoor", "Conference Rooms"][Math.floor(Math.random() * 3)] as
      | "Halls"
      | "Outdoor"
      | "Conference Rooms",
    ratings: Math.floor(Math.random() * 5) + 1,
    status: ["Available", "Unavailable"][Math.floor(Math.random() * 2)] as
      | "Available"
      | "Unavailable",
    id: generateRandomString(10),
  }));

  const columns: ColumnsType<VenueDataType> = [
    {
      title: (
        <Label content="Venue Name" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "venueName",
      sorter: (a, b) => a.venueName.localeCompare(b.venueName),
    },
    {
      title: (
        <Label content="Location" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "location",
      filters: [
        { text: "Lagos", value: "Lagos" },
        { text: "Abuja", value: "Abuja" },
        { text: "Kano", value: "Kano" },
        { text: "Enugu", value: "Enugu" },
        { text: "Kaduna", value: "Kaduna" },
      ],
      onFilter: (value, record) => record.location.includes(value as string),
    },
    {
      title: (
        <Label content="Capacity" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "capacity",
      filters: [
        { text: "Small", value: "Small" },
        { text: "Medium", value: "Medium" },
        { text: "Large", value: "Large" },
      ],
      onFilter: (value, record) => record.capacity.includes(value as string),
    },
    {
      title: (
        <Label content="Venue Type" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "venueType",
      filters: [
        { text: "Halls", value: "Halls" },
        { text: "Outdoor", value: "Outdoor" },
        { text: "Conference Rooms", value: "Conference Rooms" },
      ],
      onFilter: (value, record) => record.venueType.includes(value as string),
    },
    {
      title: (
        <Label content="Ratings" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "ratings",
      render: (ratings) => {
        const stars = Array.from({ length: 5 }, (_, index) => (
          <span key={index} style={{ color: index < ratings ? "#FFD700" : "#C0C0C0" }}>
            ★
          </span>
        ));
        return <div>{stars}</div>;
      },
    },
    {
      title: (
        <Label content="Status" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "status",
      filters: [
        { text: "Available", value: "Available" },
        { text: "Unavailable", value: "Unavailable" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
      render: (status) => {
        let style = {};
        let dotColor = "";

        if (status === "Available") {
          style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
          dotColor = "#009A44";
        } else if (status === "Unavailable") {
          style = { color: "#D30000", backgroundColor: "#FFD3D3" }; // Red
          dotColor = "#D30000";
        }

        return (
          <span
            style={{
              ...style,
              padding: "2px 10px",
              borderRadius: "25px",
              fontWeight: "500",
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
        <Label content="Action" className="font-semibold text-OWANBE_TABLE_TITLE" />
      ),
      dataIndex: "",
      render: (text: any, record: VenueDataType) => (
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
          onClick={() => router.push(`/discover/venue-hub/${record.id}/venue_details_view`)}
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
    item.venueName.toLowerCase().includes(searchText.toLowerCase())
  );

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <React.Fragment>
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => setIsShown(false)}
      />
      <div className="flex justify-between mb-4">
        <Search
          placeholder="Search Venue"
          allowClear
          value={searchText}
          onChange={onSearchChange}
          style={{ width: 300 }}
        />
      </div>
      <Table
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: setSelectedRowKeys,
        // }}
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </React.Fragment>
  );
};

export default VenueHubTable;
