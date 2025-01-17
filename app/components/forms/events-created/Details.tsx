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
import { GET_ALL_USER_EVENTS } from "@/app/utils/constants";
import { Button, Input, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useGetAllUserEvents, usePublishEvent } from "@/app/hooks/event/event.hook";
import { IEventDetails } from "@/app/utils/interface";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { PUBLISH_TYPE } from "@/app/utils/enums";
import { useQueryClient } from "@tanstack/react-query"



const { Search } = Input;

const EventsCreatedTable: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient()
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [eventStatus, setEventStatus] = useState<{
    id: string,
    eventStatus: string
  }[]>([]);
  const [actionType, setActionType] = useState<"delete" | "warning">();
  const { getAllUserEvents } = useGetAllUserEvents(currentPage, pageSize, searchText);
  
  const { publishEvent } = usePublishEvent();

  useEffect(() => {
    if (currentPage || pageSize) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USER_EVENTS, currentPage, pageSize, searchText] });
    }
  }, [currentPage, pageSize]);


  const totalEvents = getAllUserEvents?.data?.data?.data?.total;
  // 

  const allUserEventDetails = getAllUserEvents?.data?.data?.data?.data;

  const allEventsDate = allUserEventDetails?.map((event: IEventDetails) => {
    return {
      id: event?.id,
      endDate: event?.endDate
    };
  });
  const expiredEvents = allEventsDate?.filter((event: IEventDetails) => new Date(event?.endDate).getTime() < new Date().getTime());
  const expiredEventsIdList = expiredEvents?.map((event: IEventDetails) => event?.id);
  const filteredEvents = allUserEventDetails?.filter((event: IEventDetails) => new Date(event.endDate).getTime() > new Date().getTime());
  // useEffect(() => {
  //   const checkEventStatus = async () => {
  //     const response =  await publishEvent.mutateAsync({
  //       ids: [...expiredEventsIdList],
  //       mode: PUBLISH_TYPE.INACTIVE
  //     })
  //   }
  //   if(expiredEventsIdList?.length > 0) {
  //     checkEventStatus();
  //   }
  // },[expiredEventsIdList, publishEvent])

  const data: IEventDetails[] = allUserEventDetails?.map((item: IEventDetails) => {
    return {
      key: item?.id,
      eventName: item?.eventName,
      eventType: item?.eventType,
      ticketSold: item?.total_ticket_sold,
      createdAt: item?.createdAt,
      status: item?.mode,
      endDate: item?.endDate,
    }
  })

  const columns: ColumnsType<IEventDetails> = [
    {
      title: (
        <Label
          content="Event Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventName",
      sorter: (a, b) => a?.eventName?.localeCompare(b.eventName),
    },
    {
      title: (
        <Label
          content="Event Type"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "eventType",
      sorter: (a, b) => a?.eventType?.localeCompare(b.eventType),
      onFilter: (value, record) => record?.eventType?.includes(value as string),
    },
    {
      title: (
        <Label
          content="Tickets Sold"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketSold",
      sorter: (a, b) => a?.ticketSold - b?.ticketSold,
    },
    {
      title: (
        <Label
          content="Date Created"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "createdAt",
      render: (text) => { return dateFormat(text); },
      sorter: (a, b) => new Date(a?.startDate).getTime() - new Date(b?.startDate).getTime(),
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
        const statusA = a.status ?? ""; // Use nullish coalescing to handle undefined or null
        const statusB = b.status ?? "";

        if (statusA < statusB) return -1;
        if (statusA > statusB) return 1;
        return 0;
      },
      render: (status, endDate) => {
        // 
        let displayStatus = status ?? "Inactive";
        let style = {};
        let dotColor = "";

        if (status === PUBLISH_TYPE.ACTIVE) {
          style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
          dotColor = "#009A44";
        } else if (status === "Closed") {
          style = { color: "#D30000", backgroundColor: "#FFD3D3" }; // Red
          dotColor = "#D30000";
        } else if (status === PUBLISH_TYPE.INACTIVE || !status) {
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
            {status ? status.charAt(0) + status.slice(1).toLowerCase() : "Inactive"}
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
      render: (text: any, record: IEventDetails) => (
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
            router.push(`/discover/events-created/${record?.key}/about`)
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

  const filteredData = data?.filter((item) =>
    item?.eventName?.toLowerCase()?.includes(searchText?.toLowerCase())
  );

  const hasSelected = selectedRowKeys?.length > 0;

  const handleExport = (format: string) => {
    // Prepare data for export
    const exportData = selectedRowKeys?.length
      ? data?.filter((item) => selectedRowKeys?.includes(String(item?.key)))
      : data;
  
    // Format data for export
    const formattedExportData = exportData.map((item) => ({
      "Event Name": item.eventName || "N/A",
      "Event Type": item.eventType || "N/A",  // Ensure 'eventDetails' exists in the data
      "Ticket Sold": item.ticketSold || 0,          // Ensure 'ticketSold' exists in the data
      "Date Created": item.createdAt ? dateFormat(item.createdAt) : "N/A",
      "Status": item.status || "N/A",
    }));
  
    // Log the formatted data for debugging
  

  // Handle Excel Export
  if (format === "excel") {
    const ws = XLSX.utils.json_to_sheet(formattedExportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Events");
    XLSX.writeFile(wb, "EventsCreated.xlsx");
  }

  // Handle PDF Export
  if (format === "pdf") {
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [Object.keys(formattedExportData[0])],
      body: formattedExportData.map((item) => Object.values(item)),
      didDrawCell: (data: { column: { index: number }; cell: { styles: { fillColor: string } } }) => {
        if (data.column.index === 0) {
          data.cell.styles.fillColor = "#e20000"; // Optional styling for header
        }
      },
    });
    doc.save("EventsCreated.pdf");
  }
};
  


  const handleActionSuccess = () => {
    // Refetch the tickets after an action (delete, edit, duplicate)
  };

  return (
    <React.Fragment>
      <DeleteTicket
        data={eventStatus}
        open={isShown}
        onCancel={() => {
          setIsShown(false)
        }}
        onOk={() => {
          setIsShown(false)
          getAllUserEvents.refetch()
        }}
        actionType={actionType}
        selectedRowKeys={selectedRowKeys}
      />
        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search events"
            onChange={onSearchChange}
            style={{ width: 300 }}
          />
          {hasSelected && (
            <div>
               <Tooltip title="Delete Record(s)">
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
              </Tooltip>

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
            </div>
          )}
        </div>
        <Table
          loading={getAllUserEvents?.isFetching}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys, records) => {
              setSelectedRowKeys(keys.map(String));
        
              // Update `eventStatus` for bulk selection
              setEventStatus(() => {
                const selectedEvents = records.map((record) => ({
                  id: record?.key ?? "",
                  eventStatus: record?.status ?? "",
                }));
        
                return selectedEvents; // Replace with the full selected set
              });
            },
            onSelect: (record, selected) => {
              if (selected) {
                setEventStatus((prev) => [
                  ...prev.filter((item) => item.id !== record?.key), // Remove any existing record with the same ID
                  { id: record?.key ?? "", eventStatus: record?.status ?? "" } // Add the new record
                ]);
              } else {
                setEventStatus((prev) => prev.filter((item) => item.id !== record?.key)); // Remove the deselected record
              }
            },
          }}
          columns={columns}
          dataSource={data}
          className="font-BricolageGrotesqueRegular w-full custom-scrollbar"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalEvents,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
            showSizeChanger: true,
          }}
          scroll={{ x: "max-content" }}
          
        />
    </React.Fragment>
  );
};

export default EventsCreatedTable;