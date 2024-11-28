"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import AddTicketModal from "@/app/components/OstivitiesModal/AddTicket";
import DeleteTicket from "@/app/components/OstivitiesModal/DeleteTicket";
import UpdateTicket from "@/app/components/OstivitiesModal/UpdateTicket";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import { generateRandomString, getRandomEventName } from "@/app/utils/helper";
import {
  ITicketCreate,
  ITicketDetails,
  SalesDataType,
} from "@/app/utils/interface";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Table, Input, message } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useEffect, useMemo } from "react";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import {
  useEnableEventRegistration,
  useGetUserEvent,
} from "@/app/hooks/event/event.hook";
import { useParams, useRouter } from "next/navigation";
import { TICKET_ENTITY, TICKET_STOCK, TICKET_TYPE } from "@/app/utils/enums";
import ToggleSwitch from "@/app/ui/atoms/ToggleSwitch";

// Currency formatter for Naira (₦)
const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

const EventTickets = () => {
  // const { isLoggedIn } = useFetch();

  // if(!isLoggedIn) {
  //   return <div>Loading...</div>;
  // }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<"delete" | "warning">();
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<SalesDataType[]>([]);
  const params = useParams<{ id: string }>();
  const [duplicateData, setDuplicateData] = useState<
    ITicketCreate | undefined
  >();
  const [selectedTicket, setSelectedTicket] = useState<string | undefined>("");
  const [selectedTicketEntity, setSelectedTicketEntity] = useState<
    string | undefined
  >("");

  const { getTickets } = useGetEventTickets(params?.id);
  const ticketData = getTickets?.data?.data?.data;
  const { enableEventRegistration } = useEnableEventRegistration();
  const { getUserEvent } = useGetUserEvent(params?.id);
  const eventDetails = getUserEvent?.data?.data?.data;
  // const {id, ...rest} = ticketData;
  // console.log(ticketData, "ticketData")
  // console.log(duplicateData, "duplicateData")

  const handleActionSuccess = () => {
    // Refetch the tickets after an action (delete, edit, duplicate)
    getTickets.refetch();
  };

  interface MenuItemType {
    label: React.ReactNode;
    key: string;
  }

  const GuestItems: MenuItemType[] = [
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={(e) => {
            // console.log(e)
            // setSelectedTicket(e);  // Set the selected ticket's data here
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      ),
      key: "1",
    },
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={() => {
            setIsShown(true);
            setActionType("warning");
          }}
        >
          Duplicate
        </Button>
      ),
      key: "2",
    },
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={() => {
            setIsShown(true);
            setActionType("delete");
          }}
        >
          Delete
        </Button>
      ),
      key: "3",
    },
  ];

  const handleMenuClick = (key: string) => {
    // Handle menu item clicks
    console.log("Clicked on:", key);
  };

  const columns: ColumnsType<ITicketDetails> = [
    {
      title: (
        <Label
          content="Ticket Name"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketName",
      sorter: (a, b) =>
        (a.event?.eventName ?? "").localeCompare(b.event?.eventName ?? ""),
    },
    {
      title: (
        <Label
          content="Ticket Quantity"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketQty",
      sorter: (a, b) => a.ticketQty - b.ticketQty,
      render: (text, record: ITicketDetails) => {
        return (
          <>
            {record?.ticketStock === TICKET_STOCK.UNLIMITED ? (
              "Unlimited"
            ) : (
              <span>
              {record.ticketSold}/{record.ticketQty} Available
            </span>
            )}
          </>
        );
      },
    },
    {
      title: (
        <Label
          content="Ticket Price"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: ["ticketPrice", "groupPrice"],
      sorter: (a, b) => (a?.ticketPrice ?? 0) - (b?.ticketPrice ?? 0),
      render: (text, record: ITicketDetails) => {
        // console.log(text, "text");
        // console.log(record, "record");

        // Safeguard against missing properties with optional chaining
        if (record?.ticketType === TICKET_TYPE.FREE) {
          return <>Free</>;
        }

        if (record?.ticketEntity === TICKET_ENTITY.COLLECTIVE) {
          return <span>{formatCurrency(record?.groupPrice ?? 0)}</span>;
        }

        return <span>{formatCurrency(record?.ticketPrice ?? 0)}</span>;
      },
    },
    {
      title: (
        <Label
          content="Ticket Type"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketType",
      sorter: (a, b) => (a.ticketPrice ?? 0) - (b.ticketPrice ?? 0),
      render: (text, record: ITicketDetails) => {
        return <>{record?.ticketType === TICKET_TYPE.FREE ? "Free" : "Paid"}</>;
      },
    },
    {
      title: (
        <Label
          content="Ticket Entity"
          className="font-semibold text-OWANBE_TABLE_TITLE"
        />
      ),
      dataIndex: "ticketEntity",
      sorter: (a, b) =>
        (a.ticketEntity ?? "").localeCompare(b.ticketEntity ?? ""),
      render: (text, record: ITicketDetails) => {
        return (
          <>
            {record?.ticketEntity === TICKET_ENTITY.SINGLE
              ? "Single"
              : "Collective"}
          </>
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
      dataIndex: "action",
      key: "action",
      render: (text: any, record: ITicketDetails) => (
        <Space direction="vertical" size="small">
          <Dropdown
            overlay={
              <Menu>
                {GuestItems.map((item) => (
                  <Menu.Item key={item.key}>{item.label}</Menu.Item>
                ))}
              </Menu>
            }
            trigger={["click", "hover"]}
          >
            <MenuOutlined className="cursor-pointer text-lg" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const data: ITicketDetails[] = ticketData?.map((item: ITicketDetails) => {
    return {
      key: item?.id,
      ticketName: item?.ticketName,
      ticketQty: item?.ticketQty,
      ticketPrice: item?.ticketPrice,
      event: item?.event,
      ticketEntity: item?.ticketEntity,
      ticketDescription: item?.ticketDescription,
      ticketStock: item?.ticketStock,
      ticketType: item?.ticketType,
      user: item?.user,
      ticketQuestions: item?.ticketQuestions,
      groupSize: item?.groupSize,
      groupPrice: item?.groupPrice,
    };
  });
  // console.log(data, "data")

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (eventDetails?.enable_registration === true) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, [eventDetails]);

  const onChange = async () => {
    if (isToggled === false) {
      const response = await enableEventRegistration.mutateAsync({
        id: params?.id,
        enable_registration: !isToggled,
      });
      if (response.status === 200) {
        getUserEvent.refetch();
        message.success("Registration started");
        setIsToggled(!isToggled);
      }
    } else {
      const response = await enableEventRegistration.mutateAsync({
        id: params?.id,
        enable_registration: false,
      });
      if (response.status === 200) {
        setIsToggled(!isToggled);
        getUserEvent.refetch();
        message.success("Registration stopped");
      }
    }
  };

  return (
    <React.Fragment>
      <AddTicketModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          setIsModalOpen(false);
          handleActionSuccess();
        }}
      />
      <UpdateTicket
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => {
          setIsOpen(false);
          handleActionSuccess();
        }}
        id={selectedTicket}
        ticketEntity={selectedTicketEntity}
      />
      <DeleteTicket
        open={isShown}
        onCancel={() => setIsShown(false)}
        onOk={() => {
          setIsShown(false);
          handleActionSuccess();
        }}
        actionType={actionType}
        id={selectedTicket}
        data={duplicateData}
      />
      <EventDetailsComponent>
        <Space direction="vertical" size="large">
          <Space direction="vertical" size="small">
            <Heading5 className="" content={"Event Ticket "} />
            <Paragraph
              className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
              content="For free events, Ostivities is free. For paid events, we charge a percentage-based transaction fee on ticket sales."
              styles={{ fontWeight: "normal !important" }}
            />
          </Space>

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div className="flex flex-row items-center justify-between space-x-4 mt-8">
              <div className="flex flex-row items-center space-x-2">
                <ToggleSwitch
                  isActive={isToggled}
                  onToggle={(checked: boolean) => {
                    setIsToggled(checked); // Update the toggle state
                    onChange(); // Additional logic if necessary
                  }}
                  isDisabled={ticketData?.length === 0}
                  label="Registration toggle" // Provide the required label prop
                />
                <span
                  className={`font-BricolageGrotesqueMedium font-medium text-sm ${
                    ticketData?.length === 0 ? "text-gray-400" : "text-OWANBE_DARK"
                  }`}
                >
                  {" "}
                  {isToggled ? "Stop registration" : "Start registration"}
                </span>
              </div>

              <Button
                type="primary"
                size="large"
                className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
                style={{
                  borderRadius: "20px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                Add Tickets
              </Button>
            </div>

            {/* <Input.Search
              placeholder="Search tickets"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ marginBottom: 16, width: 300 }}
            /> */}
            <Table
              loading={getTickets?.isFetching}
              // rowSelection={{
              //   selectedRowKeys,
              //   onChange: (keys) => setSelectedRowKeys(keys),
              // }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () => {
                    // console.log(record, "record")
                    setSelectedTicket(record?.key);
                    setSelectedTicketEntity(record?.ticketEntity);
                    setDuplicateData({
                      ticketName: record?.ticketName,
                      ticketQty: record?.ticketQty,
                      ticketPrice: record?.ticketPrice,
                      ticketType: record?.ticketType,
                      groupSize: record?.groupSize,
                      groupPrice: record?.groupPrice,
                      ticketDescription: record?.ticketDescription,
                      ticketStock: record?.ticketStock as
                        | TICKET_STOCK
                        | undefined,
                      ticketEntity: record?.ticketEntity,
                      event: record?.event?.id,
                      user: record?.user?.id,
                      ticketQuestions: record?.ticketQuestions?.map((q) => ({
                        question: q?.question ?? "",
                        is_compulsory: q?.is_compulsory ?? false,
                      })),
                      guestAsChargeBearer: record?.guestAsChargeBearer ?? true,
                    });
                  },
                };
              }}
              columns={columns}
              dataSource={data}
              className="font-BricolageGrotesqueRegular w-full"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: data?.length,
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                },
              }}
              scroll={{ x: "max-content" }}
            />
          </Space>
        </Space>
      </EventDetailsComponent>
    </React.Fragment>
  );
};

export default EventTickets;
