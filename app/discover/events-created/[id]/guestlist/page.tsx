"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import GuestDetail from "@/app/components/OstivitiesModal/GuestDetail";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import {
  generateRandomString,
  getRandomEventName,
  getRandomName,
} from "@/app/utils/helper";
import { SalesDataType, IGuestData, IModal2 } from "@/app/utils/interface";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { useGetEventGuests } from "@/app/hooks/guest/guest.hook";
import { useParams } from "next/navigation";

const { Search } = Input;

const EventsGuestList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams<{ id: string }>();
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});
  console.log(modalData, "modalData");
  const { getEventGuests } = useGetEventGuests(
    params?.id,
    currentPage,
    pageSize
  );

  const allGuestsData = getEventGuests?.data?.data?.data?.guests;
  const totalGuests = getEventGuests?.data?.data?.data?.total;
  // const totalPages = getEventGuests?.data?.data?.data?.pages
  console.log(allGuestsData, "allGuestsData");
  const data: IGuestData[] = allGuestsData?.map((item: IGuestData) => {
    return {
      key: item?.id,
      guestName: `${item?.personal_information?.firstName} ${item?.personal_information?.lastName}`,
      ticketName: item?.ticket_information?.map(
        (ticket) => ticket?.ticket_name
      ),
      ticketQuantity: item?.total_purchased,
      orderNumber: item?.order_number,
      createdAt: item?.createdAt,
      eachTicketQuantity:
        item?.ticket_information?.map((ticket) => ticket?.quantity) || [],
      email: item?.personal_information?.email,
      phone: item?.personal_information?.phoneNumber,
      fees: item?.fees,
      total_amount_paid: item?.total_amount_paid,
      additional_information: item?.additional_information,
    };
  });
  // const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
  //   key: `${index + 1}`,
  //   eventName: getRandomEventName(),
  //   eventType: getRandomName(),
  //   ticketSold: Math.floor(Math.random() * 100),
  //   sales: Math.floor(Math.random() * 100),
  //   revenue: Math.floor(Math.random() * 10000),
  //   fees: Math.floor(Math.random() * 1000),
  //   dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
  //   chargeBearer: ["Guest", "Organizer"][Math.floor(Math.random() * 2)],
  //   status: ["Active", "Closed", "Pending"][Math.floor(Math.random() * 3)] as
  //     | "Active"
  //     | "Closed"
  //     | "Pending",
  //   id: generateRandomString(10),
  // }));

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = data?.filter(
    (item) =>
      item?.personal_information?.firstName
        ?.toLowerCase()
        .includes(searchText) ||
      item?.personal_information?.lastName
        ?.toLowerCase()
        .includes(searchText) ||
      item?.ticket_information
        ?.map((ticket) => ticket?.ticket_name)
        .join(", ")
        ?.toLowerCase()
        .includes(searchText)
  );

  const columns = [
    {
      title: "Guest Name",
      dataIndex: "guestName",
      // sorter: (a: IGuestData, b: IGuestData) =>
      //   a.eventType.localeCompare(b.eventType),
    },
    {
      title: "Ticket Bought",
      dataIndex: "ticketName",
      render: (text: string, record: any) => {
        return record?.ticketName?.map((ticket: string) => ticket).join(", ");
      },
      // sorter: (a: IGuestData, b: IGuestData) =>
      //   a.eventName.localeCompare(b.eventName),
    },
    {
      title: "Ticket Quantity",
      dataIndex: "ticketQuantity",
      // sorter: (a: IGuestData, b: IGuestData) =>
      //   a.ticketSold - b.ticketSold,
    },
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      sorter: (a: IGuestData, b: IGuestData) => {
        if (a.fees !== undefined && b.fees !== undefined) {
          return a.fees - b.fees;
        }
        return 0;
      },
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      render: (text: string) => {
        return dateFormat(text);
      },
      // sorter: (a: IGuestData, b: IGuestData) =>
      //   a.dateCreated.localeCompare(b.dateCreated),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: IGuestData) => (
        <Button
          type="primary"
          // onClick={() => handleAction(record)}
          style={{ borderRadius: "20px" }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys?.length
      ? data.filter(
          (item) => item.id !== undefined && selectedRowKeys.includes(item.id)
        )
      : data;

    const formattedExportData = exportData.map((item) => ({
      "Ticket Bought": item?.ticket_information
        ?.map((ticket) => ticket?.ticket_name)
        .join(", "),
      "Ticket Quantity": item?.total_purchased,
      "Buyer Name":
        item?.personal_information?.firstName +
        " " +
        item?.personal_information?.lastName,
      "Order Number": item.fees,
      "Order Date": item?.createdAt,
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

  const handleAction = (record: any) => {
    console.log(record, "record");
    const mockModalData = {
      ticketName: record?.ticketName,
      // eventType: record.eventType,
      ticketSold: record?.eachTicketQuantity, // Quantities for each ticket
      revenue: `₦${record?.totalAmountPaid}`,
      fees: `₦${record?.fees}`,
      sales: record?.total_purchased,
      dateCreated: dateFormat(record?.orderDate),
      email: record?.email,
      phone: record?.phone,
      orderNumber: record?.orderNumber,
      additionalInfo: record?.additionalInfo,
    };

    setModalData(mockModalData);
    setIsModalOpen(true);
  };

  return (
    <React.Fragment>
      <GuestDetail
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        data={modalData}
      />
      <EventDetailsComponent>
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Heading5 className="" content={"Guestlist"} />
          </div>
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular mb-10"
            content={
              "This displays a record of guests who have bought your tickets."
            }
            styles={{ fontWeight: "normal !important" }}
          />

          <Paragraph
            className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
            content={totalGuests && `${totalGuests} Ticketed Guests`}
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
              placeholder="Search Ticket Name or Guest Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            {selectedRowKeys?.length > 0 && (
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
            loading={getEventGuests?.isLoading}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            onRow={(record: IGuestData) => {
              return {
                onClick: () => {
                  setModalData({
                    ticketName: record?.ticketName,
                    ticketSold: record?.eachTicketQuantity, // Quantities for each ticket
                    revenue: `₦${record?.total_amount_paid}`,
                    fees: `₦${record?.fees}`,
                    sales: record?.total_purchased,
                    dateCreated: dateFormat(record?.createdAt),
                    email: record?.email,
                    phone: record?.phone,
                    guestName: record?.guestName,
                    orderNumber: record?.orderNumber,
                    additionalInfo: record?.additional_information,
                  });
                  setIsModalOpen(true);
                },
              };
            }}
            columns={columns}
            dataSource={data}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalGuests,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
              showSizeChanger: true,
            }}
            scroll={{ x: "max-content" }}
          />
        </Space>
      </EventDetailsComponent>
    </React.Fragment>
  );
};

export default EventsGuestList;
