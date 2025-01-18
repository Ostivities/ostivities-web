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
import { Button, Skeleton, Flex, Input, Space, Table, Tooltip } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDebounce } from "use-debounce";
import React, { useState } from "react";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import * as XLSX from "xlsx";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import {
  useGetEventGuests,
  useGetTicketGuests,
} from "@/app/hooks/guest/guest.hook";
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
  
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const { getEventGuests } = useGetEventGuests(
    params?.id,
    currentPage,
    pageSize,
    debouncedSearchText
  );

  const allGuestsData = getEventGuests?.data?.data?.data?.guests;
  const totalGuests = getEventGuests?.data?.data?.data?.total;
  // const totalPages = getEventGuests?.data?.data?.data?.pages
  
  const data: IGuestData[] = allGuestsData?.map((item: IGuestData) => {
    const summedQuantities = item?.ticket_information?.reduce((acc, ticket) => {
      // If the ticket_id is already in the accumulator, add the quantity to it
      if (acc[ticket.ticket_id]) {
        acc[ticket.ticket_id] += ticket.quantity;
      } else {
        // If the ticket_id is not in the accumulator, initialize it with the ticket quantity
        acc[ticket.ticket_id] = ticket.quantity;
      }
      return acc;
    }, {} as { [key: string]: number });
    return {
      key: item?.id,
      guestName: `${item?.personal_information?.firstName} ${item?.personal_information?.lastName}`,
      ticketName: Array.from(new Set(item?.ticket_information?.map(ticket => ticket.ticket_name))),
      ticketQuantity: item?.total_purchased,
      orderNumber: item?.ticket_information?.[0]?.order_number,
      createdAt: item?.createdAt,
      eachTicketQuantity: summedQuantities ? Object.values(summedQuantities) : [],
      email: item?.personal_information?.email,
      phone: item?.personal_information?.phoneNumber,
      fees: item?.fees,
      total_amount_paid: item?.total_amount_paid,
      additional_information: item?.additional_information,
    };
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

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
          onClick={() => handleAction(record)}
          style={{ borderRadius: "20px" }}
        >
          View
        </Button>
      ),
    },
  ];

  const handleExport = (format: string) => {
    // Filter data based on selected rows
    const exportData = selectedRowKeys?.length
      ? data.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    // Log filtered data
    
    

    // Format data for export
    const formattedExportData = exportData.map((item) => ({
      "Guest Name": item.guestName || "N/A",
      "Ticket Bought": item.ticketName?.join(", ") || "N/A",
      "Ticket Quantity": item.ticketQuantity || "N/A",
      Email: item.email || "N/A",
      "Order Number": item.orderNumber || "N/A",
      "Order Date": item.createdAt ? dateFormat(item.createdAt) : "N/A",
    }));

    // Check if there's data to export
    if (!formattedExportData.length) {
      console.error("No data to export.");
      return;
    }

    

    // Handle Excel Export
    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Guest List");
      XLSX.writeFile(wb, "Guest List.xlsx");
    }

    // Handle PDF Export
    if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map((item) => Object.values(item)),
        didDrawCell: (data: {
          column: { index: number };
          cell: { styles: { fillColor: string } };
        }) => {
          if (data.column.index === 0) {
            data.cell.styles.fillColor = "#e20000"; // Optional styling
          }
        },
      });
      doc.save("Guest List.pdf");
    }
  };

  const handleAction = (record: IGuestData) => {
    // 
    const mockModalData = {
      ticketName: record?.ticketName,
      ticketSold: record?.eachTicketQuantity, // Quantities for each ticket
      revenue: `₦${record?.total_amount_paid?.toLocaleString()}`,
      fees: `₦${record?.fees?.toLocaleString()}`,
      sales: record?.total_purchased?.toLocaleString(),
      dateCreated: dateFormat(record?.createdAt),
      email: record?.email,
      phone: record?.phone,
      guestName: record?.guestName,
      orderNumber: record?.orderNumber,
      additionalInfo: record?.additional_information,
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

          <div className="w-full">
            {getEventGuests?.isLoading ? (
              <Flex
                gap="middle"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                vertical
              >
                <Skeleton.Button
                  style={{
                    height: "80px",
                    minWidth: "320px",
                    maxWidth: "1000px",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "12px",
                  }}
                  active
                />
              </Flex>
            ) : (
              <Paragraph
                className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg max-w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
                content={
                  totalGuests > 0
                    ? `${totalGuests} Ticketed Guests`
                    : `0 Ticketed Guest`
                }
                styles={{ fontWeight: "normal !important" }}
              />
            )}
          </div>
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
              onChange={handleSearch}
              style={{ width: 300 }}
            />
            {selectedRowKeys?.length > 0 && (
              <Space>
                <Tooltip title="Export as Excel">
                <Button
                  type="default"
                  className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                  style={{ borderRadius: 15, marginRight: 8 }}
                  onClick={() => handleExport("excel")}
                >
                  <FileExcelOutlined />
                </Button>
                </Tooltip>

                <Tooltip title="Export as PDF">
                <Button
                  type="default"
                  className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                  style={{ borderRadius: 15 }}
                  onClick={() => handleExport("pdf")}
                >
                  <FilePdfOutlined />
                </Button> 
                </Tooltip>
              </Space>
            )}
          </Space>

          <Table
            loading={getEventGuests?.isLoading}
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
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
