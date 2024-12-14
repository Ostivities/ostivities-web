"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { Heading5, Label, Paragraph } from "@/app/components/typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SummaryDataType, ICheckInSummary } from "@/app/utils/interface";
import { useGetCheckInSummary } from "@/app/hooks/event/event.hook";
import { Button, Input, Space, Table } from "antd";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter, useParams } from "next/navigation";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";

const { Search } = Input;

function getRandomGuestName(): string {
  const names = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Brown", "David Wilson"];
  return names[Math.floor(Math.random() * names.length)];
}

function getRandomCheckInName(): string {
  const checkers = ["Alice Manager", "Bob Supervisor", "Charlie Checker", "Dana Admin"];
  return checkers[Math.floor(Math.random() * checkers.length)];
}

function getRandomTicketType(): string {
  const checkers = ["Single", "Collective"];
  return checkers[Math.floor(Math.random() * checkers.length)];
}

const EventsGuestListSummary = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const params = useParams<{ id: string }>();
  const [searchText, setSearchText] = useState<string>("");
  const { getCheckInSummary } = useGetCheckInSummary(params?.id, currentPage, pageSize, searchText);
  const summaryInfo = getCheckInSummary?.data?.data?.data?.check_in_summary;
  const totalCheckedIn = getCheckInSummary?.data?.data?.data?.total;
  // console.log(getCheckInSummary, "getCheckInSummary");


  const data: ICheckInSummary[] = summaryInfo?.map((item: ICheckInSummary) => {
    return {
      key: item?.id,
      guestName: `${item?.personal_information?.firstName} ${item?.personal_information?.lastName}`,
      ticketName: item?.ticket_information?.[0]?.ticket_name,
      // ticketType: item?.ticket_information?.[0]?.ticket_type,
      checkedInTime: item?.check_in_date_time,
      checkedInBy: item?.check_in_by,
    }
  })

  const columns: ColumnsType<ICheckInSummary> = [
    {
      title: (
        <Label
          content="Guest Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "guestName",
      // sorter: (a, b) => a.guestName.localeCompare(b.guestName),
    },
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketName",
      // sorter: (a, b) => a.ticketName.localeCompare(b.ticketName),
    },
    // {
    //   title: (
    //     <Label
    //       content="Ticket Type"
    //       className="font-semibold text-OWANBE_TABLE_TITLE"
    //     />
    //   ),
    //   dataIndex: "ticketType",
    //   sorter: (a, b) => a.ticketType.localeCompare(b.ticketType),
    // },
    {
      title: (
        <Label
          content="Checked in Time"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "checkedInTime",
      // sorter: (a, b) => new Date(a.checkedInTime).getTime() - new Date(b.checkedInTime).getTime(),
    },
    {
      title: (
        <Label
          content="Checked in By"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "checkedInBy", // New column for the person who checked the guest in
      // sorter: (a, b) => a.checkedInBy.localeCompare(b.checkedInBy),
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data?.filter((item: ICheckInSummary) => selectedRowKeys.includes(item?.key!))
      : data;

    const formattedExportData = exportData.map((item: ICheckInSummary) => ({
      "Guest Name": `${item?.personal_information?.firstName} ${item?.personal_information?.lastName}`,
      "Ticket Name": item?.ticket_information?.[0]?.ticket_name,
      // "Ticket Type": item.ticketType,
      "Checked in Time": item?.check_in_date_time,
      "Checked in By": item?.check_in_by, // Include in the export data
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

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
          >
        <Heading5 className="" content={"Checked In Summary"} />
        </div>
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={"This displays a record of guests whose tickets have been scanned and checked in by the ticketing agent."}
            styles={{ fontWeight: "normal !important" }}
          />
          
        <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-40 rounded-2xl float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                margin: '10px'
              }}
              onClick={() => getCheckInSummary.refetch()}
            >
              Refresh
            </Button> 

        <Paragraph
              className="text-OWANBE_PRY font-normal font-BricolageGrotesqueRegular text-center mx-auto border border-OWANBE_PRY bg-OWANBE_PRY2 rounded-lg w-[500px] h-14 flex flex-row items-center justify-center text-3xl py-8 place-self-center"
              content={`${totalCheckedIn} Checked In Guests`}
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
            placeholder="Search Guest Name"
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
          dataSource={data}
          className="font-BricolageGrotesqueRegular w-full"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalCheckedIn,
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
  );
};

export default EventsGuestListSummary;
