import { DataType } from "@/app/utils/interface";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React from "react";
import { Label } from "../typography/Typography";

function EventTicketTable() {
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "name",
      filterMode: "tree",
      filterSearch: true,
      sorter: (a, b) => a.age - b.age,
      width: "30%",
    },
    {
      title: (
        <Label
          content="Ticket Quantity"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
      filterSearch: true,
      width: "30%",
    },
    {
      title: (
        <Label
          content="Ticket Price"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "address",
      sorter: (a, b) => a.age - b.age,
      filterSearch: false,
      width: "40%",
    },
    {
      title: (
        <Label
          content="Action"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "",
      filterSearch: true,
      width: "40%",
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  return (
    <div className="w-full">
      <Table
        columns={columns}
        dataSource={data}
        className="font-BricolageGrotesqueRegular"
      />
      ;
    </div>
  );
}

export default EventTicketTable;
