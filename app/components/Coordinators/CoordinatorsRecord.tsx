"use client";

import React, { useState, useMemo } from "react";
import { Button, Input, Space, Table, Flex, Skeleton, Tooltip } from "antd";
import {
  FileExcelOutlined,
  FilePdfOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import { useDebounce } from "use-debounce";
import { ColumnsType } from "antd/es/table";
import {
  getRandomName,
  getRandomNigerianPhoneNumber,
} from "@/app/utils/helper";
import {
  useGetEventCoordinatorInfo,
  useGetAllEventCoordinators,
  useDeleteEventCoordinator,
} from "@/app/hooks/coordinators/coordinators.hook";
import { useParams } from "next/navigation";
import CoordinatorsDetail from "@/app/components/OstivitiesModal/CoordinatorsDetail";
import { CoordinatorsDataType } from "@/app/utils/interface";
import { MenuItemType } from "antd/es/menu/interface";
import Dropdown from "antd/es/dropdown/dropdown";
import AddCoordinatorsModal from "@/app/components/OstivitiesModal/AddEventCoordinatorModal";
import DeleteEntry from "@/app/components/OstivitiesModal/DeleteEntry";
import { ICoordinatorData } from "@/app/utils/interface";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { STAFF_ROLE } from "@/app/utils/enums";

const { Search } = Input;

const CoordinatorsList = () => {
  const router = useRouter(); // Initialize useRouter
  const params = useParams<{ id: string }>();
  const { getAllEventCoordinators } = useGetAllEventCoordinators(params?.id);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCoordinator, setSelectedCoordinator] = useState<
    string | undefined
  >("");
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<
    "delete" | "warning" | "detail"
  >();
  const [showNewVendorDetails, setShowNewVendorDetails] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  const allCoordinators = getAllEventCoordinators?.data?.data?.data?.data;
  const totalCoordinators = getAllEventCoordinators?.data?.data?.data?.total;
  const data: ICoordinatorData[] = allCoordinators?.map(
    (coordinators: ICoordinatorData) => {
      return {
        key: coordinators?.id,
        id: coordinators?.id,
        staff_name: coordinators?.staff_name,
        staff_email: coordinators?.staff_email,
        staff_phone_number: coordinators?.staff_phone_number,
        staff_role: coordinators?.staff_role,
        createdAt: coordinators?.createdAt,
      };
    }
  );

  // 

  const [debouncedSearchText] = useDebounce(searchText, 1000); // Debounce delay: 300ms

  const handleSearch = (value: string) => {
    setSearchText(value.toLowerCase());
  };

  const filteredData = data?.filter(
    (item) =>
      item.staff_name.toLowerCase().includes(debouncedSearchText) ||
      item.staff_role.toLowerCase().includes(debouncedSearchText)
  );

  const columns: ColumnsType<ICoordinatorData> = [
    {
      title: "Coordinator's Name", // Correct title if needed
      dataIndex: "staff_name", // Ensure dataIndex matches
      sorter: (a, b) => a.staff_name.localeCompare(b.staff_name),
    },
    {
      title: "Role",
      dataIndex: "staff_role", // Ensure dataIndex matches
      // filters: [
      //   { text: "Ticketing Agent", value: "Ticketing Agent" },
      //   { text: "Auditor", value: "Auditor" },
      //   { text: "Usher", value: "Usher" },
      // ],
      render: (text, record: ICoordinatorData) => {
        return (
          <>
            {record?.staff_role === STAFF_ROLE.AGENT
              ? "Ticketing Agent"
              : record?.staff_role === STAFF_ROLE.AUDITOR
              ? "Auditor"
              : "Usher"}
          </>
        );
      },
      onFilter: (value, record) => record.staff_role.includes(value as string), // Ensure property name matches
      sorter: (a, b) => a.staff_role.localeCompare(b.staff_role), // Ensure property name matches
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      render: (text) => {
        return dateFormat(text);
      },
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
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
      render: (text: any, record: ICoordinatorData) => (
        <Space direction="vertical" size="small">
          <Dropdown
            menu={{
              items: GuestItems,
            }}
            trigger={["click", "hover"]}
          >
            <MenuOutlined className="cursor-pointer text-lg" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const GuestItems: MenuItemType[] = [
    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{ color: "#000000", fontFamily: "BricolageGrotesqueRegular" }}
          onClick={() => {
            setIsModalOpen(true);
            setActionType("detail");
          }}
        >
          View
        </Button>
      ),
      key: "1",
    },

    {
      label: (
        <Button
          type="link"
          className="font-BricolageGrotesqueRegular font-normal text-sm text-OWANBE_DARK"
          style={{
            color: "#000000",
            fontFamily: "BricolageGrotesqueRegular",
          }}
          onClick={() => {
            setIsModalOpen(true);
            setActionType("delete");
          }}
        >
          Delete
        </Button>
      ),
      key: "3",
    },
  ];

  const handleExport = (format: string) => {
    const exportData = selectedRowKeys.length
      ? data?.filter((item) => selectedRowKeys.includes(item.key))
      : data;

    const formattedExportData = exportData.map((item) => ({
      "Coordinator Name": item?.staff_name, // Corrected property name
      "Coordinator Email": item?.staff_email, // Corrected property name
      "Coordinator Phone Number": item?.staff_phone_number, // Corrected property name
      "Date Added": dateFormat(item?.createdAt),
      Role: item?.staff_role, // Corrected property name
    }));

    if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(formattedExportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Coordinators List");
      XLSX.writeFile(wb, "Coordinators List.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [Object.keys(formattedExportData[0])],
        body: formattedExportData.map((item) => Object.values(item)),
      });
      doc.save("Coordinators List.pdf");
    }
  };

  return (
    <React.Fragment>
      {isModalOpen && actionType === "detail" && (
        <CoordinatorsDetail
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          data={modalData}
          id={selectedCoordinator}
        />
      )}
      {/* Render the DeleteEntryModal based on the isModalOpen state */}
      {isModalOpen && actionType === "delete" && (
        <DeleteEntry
          open={isModalOpen}
          id={selectedCoordinator}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => {
            // Perform delete action here if needed
            setIsModalOpen(false); // Close the modal after delete
            getAllEventCoordinators?.refetch();
          }}
          actionType={actionType}
        />
      )}

      <AddCoordinatorsModal
        open={showNewVendorDetails}
        onCancel={() => setShowNewVendorDetails(false)}
        onOk={() => {
          setShowNewVendorDetails(false);
          getAllEventCoordinators?.refetch();
        }}
      />

      <Space direction="vertical" size={"large"}>
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Heading5 className="" content={"Coordinators"} />
          </div>
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Add and manage coordinators for your event."}
            styles={{ fontWeight: "normal !important" }}
          />
          <Button
            type="primary"
            size="large"
            className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-40 rounded-2xl float-end"
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
              margin: "10px",
            }}
            onClick={() => setShowNewVendorDetails(true)}
          >
            Add Coordinators
          </Button>
          <div className="w-full">
            {getAllEventCoordinators?.isLoading ? (
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
                  totalCoordinators
                    ? `${totalCoordinators} Coordinators`
                    : "0 Coordinators"
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
              placeholder="Search Coordinators Name"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            {selectedRowKeys.length > 0 && (
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
            rowSelection={{
              selectedRowKeys,
              onChange: (keys) => setSelectedRowKeys(keys),
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  setSelectedCoordinator(record?.id);
                },
              };
            }}
            className="font-BricolageGrotesqueRegular w-full"
            columns={columns}
            loading={getAllEventCoordinators?.isFetching}
            dataSource={filteredData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalCoordinators,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
              showSizeChanger: true,
            }}
            scroll={{ x: "max-content" }}
          />
        </Space>
      </Space>
    </React.Fragment>
  );
};

export default CoordinatorsList;
