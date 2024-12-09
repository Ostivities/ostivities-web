"use client";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import GuestDetail from "@/app/components/OstivitiesModal/GuestDetail";
import ViewOrder from "@/app/discover/events-created/[id]/merchandise/orders/vieworder/page";
import { Heading5, Label, Paragraph } from "@/app/components/typography/Typography";
import { Button, Dropdown, Input, Space, Table } from "antd";
import { DeleteOutlined, FileExcelOutlined, FilePdfOutlined, MenuOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { MenuItemType } from "antd/es/menu/interface";
import { OrderDataType } from "@/app/utils/interface";


const OrderList = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [orderSearchText, setorderSearchText] = useState("");
  const [selectedorderRowKeys, setSelectedorderRowKeys] = useState<React.Key[]>([]);
  const [currentorderPage, setCurrentorderPage] = useState(1);
  const [orderPageSize, setorderPageSize] = useState(10);
  const [showVieworder, setShowVieworder] = useState<boolean>(false);

  const OrderData: OrderDataType[] = Array.from({ length: 20 }, (_, index) => ({
    key: `${index + 1}`,
    orderId: `ORD-${index + 1000}`,
    productName: `Product ${index + 1}`,
    total: Math.floor(Math.random() * 10000),
    orderStatus: index % 3 === 0 ? "Completed" : index % 3 === 1 ? "Cancelled" : "Processing",
    payment: "Paid",
    shipping: index % 3 === 0 ? "Delivered" : index % 3 === 1 ? "Shipped" : "Returned",
    date: new Date().toLocaleDateString(),
  }));



  const getStatusStyle = (status: keyof typeof styles) => {
    const styles = {
      Completed: { color: "#009A44", backgroundColor: "#E6F5ED" },
      Cancelled: { color: "#FF0000", backgroundColor: "#FDE8E8" },
      Processing: { color: "#F68D2E", backgroundColor: "#FFF5E5" },
      Delivered: { color: "#009A44", backgroundColor: "#E6F5ED" },
      Shipped: { color: "#0073E6", backgroundColor: "#E0F0FF" },
      Returned: { color: "#FF0000", backgroundColor: "#FDE8E8" },
    };
    return styles[status];
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<
    "delete" | "warning" | "detail"
  >();
  const [showNeworder, setShowNeworder] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  // const handleAction = (record: CoordinatorsDataType) => {
  //   setIsModalOpen(true);
  //   setModalData(record);
  // };

  const orderColumns: ColumnsType<OrderDataType> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      sorter: (a, b) => a.orderId.localeCompare(b.orderId),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      title: "Total",
      dataIndex: "total",
      sorter: (a, b) => a.total - b.total,
      render: (total) => `₦${total.toLocaleString()}`,
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
      render: (status) => (
        <span
          style={{
            ...getStatusStyle(status),
            padding: "2px 10px",
            borderRadius: "25px",
            fontWeight: 500,
            textAlign: "center",
            display: "inline-block",
          }}
        >
          {status}
        </span>
      ),
    },
    // {
    //   title: "Payment",
    //   dataIndex: "payment",
    //   sorter: (a, b) => a.payment.localeCompare(b.payment),
    // },
    {
      title: "Shipping",
      dataIndex: "shipping",
      sorter: (a, b) => a.shipping.localeCompare(b.shipping),
      render: (status) => (
        <span
          style={{
            ...getStatusStyle(status),
            padding: "2px 10px",
            borderRadius: "25px",
            fontWeight: 500,
            textAlign: "center",
            display: "inline-block",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
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
      render: (text: any) => (
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
          onClick={() => setShowVieworder(true)}
        >
          View
        </Button>
      ),
      key: "1",
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

  const handleOrderSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setorderSearchText(e.target.value);
  };


  const filteredOrderData = OrderData.filter((item) =>
    item.productName.toLowerCase().includes(orderSearchText.toLowerCase())
  );

  return (
    <React.Fragment>
      {
        !showVieworder && (
          <>
            <GuestDetail
              open={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              data={modalData}
            />
            <Space direction="vertical" size="middle" className="w-full">
              <Space
                direction="horizontal"
                className="w-full justify-between items-center"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Heading5 className="-mb-2" content={"Orders"} />
              </Space>

              <Paragraph
                className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
                content={"Manage your orders here."}
                styles={{ fontWeight: "normal !important" }}
              />
              <Space className="w-full justify-between">
                <Input
                  placeholder="Search orders"
                  onChange={handleOrderSearch}
                  style={{ width: 300, marginTop: "30px", }}
                />
                {selectedorderRowKeys.length > 0 && (
                  <Space>
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
                    <Button
                      type="default"
                      className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                      style={{ borderRadius: 15, marginRight: 8 }}
                      onClick={() => handleExport("excel", OrderData.filter((item) => selectedorderRowKeys.includes(item.key)), orderColumns, "orderHistory")}
                    >
                      <FileExcelOutlined />
                    </Button>
                    <Button
                      type="default"
                      className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
                      style={{ borderRadius: 15 }}
                      onClick={() => handleExport("pdf", OrderData.filter((item) => selectedorderRowKeys.includes(item.key)), orderColumns, "orderHistory")}
                    >
                      <FilePdfOutlined />
                    </Button>
                  </Space>
                )}
              </Space>
              <Table
                rowSelection={{
                  selectedRowKeys: selectedorderRowKeys,
                  onChange: (keys) => setSelectedorderRowKeys(keys),
                }}
                columns={orderColumns}
                dataSource={filteredOrderData}
                pagination={{
                  current: currentorderPage,
                  pageSize: orderPageSize,
                  onChange: (page, size) => {
                    setCurrentorderPage(page);
                    setorderPageSize(size);
                  },
                }}
                scroll={{ x: "max-content" }}
              />
            </Space>
          </>
        )
      }
      {
        showVieworder && (
          <ViewOrder />
        )
      }
    </React.Fragment>
  );
};

export default OrderList;