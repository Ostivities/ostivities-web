"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import { Heading5, Label } from "@/app/components/typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import { SalesDataType,ExhibitionDataType, PaymentDataType, ITicketDetails } from "@/app/utils/interface";
import { Button, Input, Space, Table, Tabs } from "antd";
import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import { useGetUserEvent } from "@/app/hooks/event/event.hook";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import { useParams } from "next/navigation";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";

const { Search } = Input;

const EventSales = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const params = useParams<{ id: string }>();
  const { getUserEvent } = useGetUserEvent(params?.id);
  const { getTickets } = useGetEventTickets(params?.id);
  const ticketData = getTickets?.data?.data?.data;
  const [paymentSearchText, setPaymentSearchText] = useState("");
  const [selectedPaymentRowKeys, setSelectedPaymentRowKeys] = useState<React.Key[]>([]);
  const [currentPaymentPage, setCurrentPaymentPage] = useState(1);
  const [paymentPageSize, setPaymentPageSize] = useState(10);

  const [spaceSearchText, setSpaceSearchText] = useState("");
  const [selectedSpaceRowKeys, setSelectedSpaceRowKeys] = useState<React.Key[]>([]);
  const [currentSpacePage, setCurrentSpacePage] = useState(1);
  const [spacePageSize, setSpacePageSize] = useState(10);

  console.log(getUserEvent, "getuserevent")

  const eventDetails = getUserEvent?.data?.data?.data;
  console.log(eventDetails, "eventdetails")

  const totalTicketSold = eventDetails?.total_ticket_sold;

  const totalRevenue = eventDetails?.total_sales_revenue;

  const data:  ITicketDetails[] = ticketData?.map((ticket: ITicketDetails) => {
    return {
      key: ticket?.id,
      ticketName: ticket?.ticketName,
      ticketSold: ticket?.ticket_sold,
      sales: ticket?.ticket_sales_revenue,
      revenue: ticket?.ticket_net_sales_revenue,
      fees: ticket?.fees,
      dateCreated: ticket?.createdAt,
      guestAsChargeBearer: ticket?.guestAsChargeBearer === true ? "Guest" : "Organizer",
      id: ticket?.id,
    };
  })

  // const data: SalesDataType[] = Array.from({ length: 50 }, (_, index) => ({
  //   key: `${index + 1}`,
  //   eventName: getRandomEventName(),
  //   eventType: `Type ${index + 1}`,
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

  const paymentData: PaymentDataType[] = Array.from({ length: 20 }, (_, index) => ({
    key: `${index + 1}`,
    recipient: `Recipient ${index + 1}`,
    bankAccount: `******${Math.floor(100000 + Math.random() * 900000).toString()}`,
    transferFee: Math.floor(Math.random() * 1000),
    payout: Math.floor(Math.random() * 10000),
    status: index % 2 === 0 ? "Completed" : "Pending",
    paymentDate: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
  }));

  const exhibitionData: ExhibitionDataType[] = Array.from({ length: 50 }, (_, index) => ({
    key: `${index + 1}`,
    eventName: getRandomEventName(),
    spaceBooked: Math.floor(Math.random() * 100),
    sales: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 10000),
    fees: Math.floor(Math.random() * 1000),
    dateCreated: `2024-07-${(index + 1).toString().padStart(2, "0")}`,
    chargeBearer: ["Vendor", "Organizer"][Math.floor(Math.random() * 2)],
    id: generateRandomString(10),
  })).slice(0, 1);


  const columns: ColumnsType<ITicketDetails> = [
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketName",
      // sorter: (a, b) => a.eventName.localeCompare(b.eventName),
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
          content="Sales Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "revenue",
      // sorter: (a, b) => (a.revenue ?? 0) - (b.revenue ?? 0),
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
          content="Charge Bearer"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "guestAsChargeBearer",
      filters: [
        { text: "Guest", value: "Guest" },
        { text: "Organizer", value: "Organizer" },
      ],
      // onFilter: (value, record) => record.guestAsChargeBearer?.includes(value as string), // Ensure property name matches
      // sorter: (a, b) => a.guestAsChargeBearer?.localeCompare(b.guestAsChargeBearer), // Ensure property name matches
    },
    {
      title: (
        <Label
          content="Net Sales Revenue"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "sales",
      // sorter: (a, b) => (a.sales ?? 0) - (b.sales ?? 0),
      render: text => `₦${text.toLocaleString()}`,
    },
  ];

  const spacecolumns: ColumnsType<ExhibitionDataType> = [
    {
      title: (
        <Label
          content="Space Booked"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "spaceBooked",
      sorter: (a, b) => a.spaceBooked - b.spaceBooked,
    },
    {
      title: (
        <Label
          content="Sales Revenue"
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
          content="Charge Bearer"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "chargeBearer",
      filters: [
        { text: "Guest", value: "Guest" },
        { text: "Organizer", value: "Organizer" },
      ],
      onFilter: (value, record) => record.chargeBearer.includes(value as string), // Ensure property name matches
      sorter: (a, b) => a.chargeBearer.localeCompare(b.chargeBearer), // Ensure property name matches
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


  const paymentColumns: ColumnsType<PaymentDataType> = [
    {
      title: (
        <Label
          content="Recipient"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "recipient",
      sorter: (a, b) => a.recipient.localeCompare(b.recipient),
    },
    {
      title: (
        <Label
          content="Bank Account"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "bankAccount",
      render: text => `******${text.slice(-4)}`,
    },
    {
      title: (
        <Label
          content="Transfer Fee"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "transferFee",
      sorter: (a, b) => (a.transferFee ?? 0) - (b.transferFee ?? 0),
      render: text => `₦${text.toLocaleString()}`,
    },
    {
      title: (
        <Label
          content="Payout"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "payout",
      sorter: (a, b) => (a.payout ?? 0) - (b.payout ?? 0),
      render: text => `₦${text.toLocaleString()}`,
    },
    {
      title: (
        <Label
          content="Status"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "status",
      sorter: (a, b) => {
        // Handle undefined or null status values
        const statusA = a.status?.toLowerCase() ?? "";
        const statusB = b.status?.toLowerCase() ?? "";
    
        if (statusA < statusB) return -1;
        if (statusA > statusB) return 1;
        return 0;
      },
      render: (status) => {
        // Default to "Pending" if status is undefined
        const displayStatus =
          status === "Completed" || status === "Pending" ? status : "Pending";
    
        // Determine styles based on status
        let style = {};
        let dotColor = "";
    
        if (displayStatus === "Completed") {
          style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
          dotColor = "#009A44";
        } else if (displayStatus === "Pending") {
          style = { color: "#F68D2E", backgroundColor: "#FDE8D5" }; // Orange
          dotColor = "#F68D2E";
        }
    
        // Render the status with a colored dot and styled badge
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
            {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1).toLowerCase()}
          </span>
        );
      },
    },
    
    {
      title: (
        <Label
          content="Payment Date"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "paymentDate",
      sorter: (a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime(),
    },
  ];

  const handleExport = (format: string, dataToExport: any[], columns: ColumnsType<any>, fileName: string) => {
    const formattedExportData = dataToExport.map(item => {
      const formattedItem: { [key: string]: any } = {};
      columns.forEach(column => {
        if ('title' in column && 'dataIndex' in column) {
          const title = (column.title as React.ReactNode) as { props?: { content?: string } };
          const columnTitle = title?.props?.content || 'Unknown';
          formattedItem[columnTitle] = item[column.dataIndex as keyof typeof item];
        }
      });
      return formattedItem;
    });

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, fileName);
      XLSX.writeFile(wb, `${fileName}.xlsx`);
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
      doc.save(`${fileName}.pdf`);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


  const handlePaymentSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentSearchText(e.target.value);
  };

  const filteredData = data?.filter(item =>
    item?.ticketName?.toLowerCase()?.includes(searchText?.toLowerCase())
  );
  
  const filteredspaceData = exhibitionData.filter(item =>
    item.eventName.toLowerCase().includes(spaceSearchText.toLowerCase())
  );

  const filteredPaymentData = paymentData.filter(item =>
    item.recipient.toLowerCase().includes(paymentSearchText.toLowerCase())
  );

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    // Handle table changes like sorting and pagination if needed
  };

  const { TabPane } = Tabs;

const tabStyle = {
  fontFamily: 'Bricolage Grotesque',
  fontWeight: 500,
};

const activeTabStyle = {
  ...tabStyle, // Include common styles
  color: '#e20000', // Active color
  position: 'relative',
};

const inactiveTabStyle = {
  ...tabStyle, // Include common styles
  color: 'grey', // Inactive color
};
  
  
  return (
    <EventDetailsComponent totalTickets={totalTicketSold} totalRevenue={totalRevenue}>
      <Space direction="vertical" size="middle" className="w-full">
        <Tabs defaultActiveKey="1" className="w-full" onChange={setActiveKey}>
          <TabPane
            tab={
              <span style={activeKey === "1" ? activeTabStyle : inactiveTabStyle}>
                Ticket Sales
                {activeKey === "1" && <span />}
              </span>
            }
            key="1"
          >
            <Heading5 className="pt-4 pb-5" content={"Ticket Sales"} />
            <Space className="w-full justify-between">
              <Input
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
                    onClick={() => handleExport("excel", data.filter((item) => item?.key && selectedRowKeys.includes(item.key)), columns, "TicketSales")}
                  >
                    <FileExcelOutlined /> 
                  </Button>
                  <Button
                    type="default"
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    style={{ borderRadius: 15 }}
                    onClick={() => handleExport("pdf", data.filter((item) => item?.key && selectedRowKeys.includes(item?.key)), columns, "TicketSales")}
                  >
                    <FilePdfOutlined />
                  </Button>
                </Space>
              )}
            </Space>
            <br /><br />
            <Table
              loading={getTickets?.isLoading}
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
                total: filteredData?.length,
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                },
              }}
              scroll={{ x: "max-content" }}
            />
          </TabPane>
          <TabPane
            tab={
              <span style={activeKey === "2" ? activeTabStyle : inactiveTabStyle}>
                Exhibition Space Booked Sales 
                {activeKey === "2" && <span />}
              </span>
            }
            key="2"
          >
            <Heading5 className="pt-4 pb-5" content={"Exhibition Space Booked Sales"} />
            <Space className="w-full justify-between" />
            <Table
              rowSelection={{
                selectedRowKeys: selectedSpaceRowKeys,
                onChange: (keys) => setSelectedSpaceRowKeys(keys),
              }}
              columns={spacecolumns}
              dataSource={exhibitionData}
              className="font-BricolageGrotesqueRegular w-full"
              pagination={{
                current: currentSpacePage,
                pageSize: spacePageSize,
                total: filteredspaceData.length,
                onChange: (page, size) => {
                  setCurrentSpacePage(page);
                  setSpacePageSize(size);
                },
              }}
              scroll={{ x: "max-content" }}
            />
          </TabPane>
          <TabPane
            tab={
              <span style={activeKey === "3" ? activeTabStyle : inactiveTabStyle}>
                Payment History
                {activeKey === "3" && <span />}
              </span>
            }
            key="3"
          >
            <Heading5 className="pt-4 pb-5" content={"Payment History"} />
            <Space className="w-full justify-between">
              <Input
                placeholder="Search Recipient Name"
                onChange={handlePaymentSearch}
                style={{ width: 300 }}
              />
              {selectedPaymentRowKeys.length > 0 && (
                <Space>
                  <Button
                    type="default"
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    style={{ borderRadius: 15, marginRight: 8 }}
                    onClick={() => handleExport("excel", paymentData.filter((item) => selectedPaymentRowKeys.includes(item.key)), paymentColumns, "PaymentHistory")}
                  >
                    <FileExcelOutlined />
                  </Button>
                  <Button
                    type="default"
                    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                    style={{ borderRadius: 15 }}
                    onClick={() => handleExport("pdf", paymentData.filter((item) => selectedPaymentRowKeys.includes(item.key)), paymentColumns, "PaymentHistory")}
                  >
                    <FilePdfOutlined />
                  </Button>
                </Space>
              )}
            </Space>
            <br /><br />
            <Table
              rowSelection={{
                selectedRowKeys: selectedPaymentRowKeys,
                onChange: (keys) => setSelectedPaymentRowKeys(keys),
              }}
              columns={paymentColumns}
              dataSource={filteredPaymentData}
              className="font-BricolageGrotesqueRegular w-full"
              pagination={{
                current: currentPaymentPage,
                pageSize: paymentPageSize,
                total: filteredPaymentData.length,
                onChange: (page, size) => {
                  setCurrentPaymentPage(page);
                  setPaymentPageSize(size);
                },
              }}
              scroll={{ x: "max-content" }}
            />
          </TabPane>
        </Tabs>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventSales;
