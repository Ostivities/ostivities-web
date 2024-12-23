"use client";
import "jspdf-autotable";
import { useRouter } from "next/navigation";
import GuestDetail from "@/app/components/OstivitiesModal/GuestDetail";
import ViewProduct from "@/app/discover/events-created/[id]/merchandise/products/viewproduct/page";
import NewProduct from "@/app/discover/events-created/[id]/merchandise/products/newproduct/page";
import { Heading5, Label, Paragraph } from "@/app/components/typography/Typography";
import { ICoordinatorData, ProductDataType } from "@/app/utils/interface";
import { Button, Dropdown, Input, Space, Table, Tabs, Tooltip } from "antd";
import { DeleteOutlined, FileExcelOutlined, FilePdfOutlined, MenuOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { MenuItemType } from "antd/es/menu/interface";
import ToggleSwitch from "@/app/ui/atoms/ToggleSwitch";


const { Search } = Input;

const Productlist = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [productSearchText, setProductSearchText] = useState("");
  const [selectedProductRowKeys, setSelectedProductRowKeys] = useState<React.Key[]>([]);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [productPageSize, setProductPageSize] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const [showViewProduct, setShowViewProduct] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState(false);

  
  const handleToggle = () => {
    setIsToggled((prev) => !prev); // Toggles the state between true and false
  };

  const ProductData: ProductDataType[] = Array.from({ length: 20 }, (_, index) => ({
    key: `${index + 1}`,
    product: `Product ${index + 1}`,
    inStock: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 10000),
    status: index % 2 === 0 ? "Available" : "Unavailable",
  }));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [actionType, setActionType] = useState<
    "delete" | "warning" | "detail"
  >();
  const [showNewProduct, setShowNewProduct] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState<any>({});

  // const handleAction = (record: CoordinatorsDataType) => {
  //   setIsModalOpen(true);
  //   setModalData(record);
  // };

  const productColumns: ColumnsType<ProductDataType> = [
    {
      title: <Label content="Product" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "product",
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: <Label content="InStock" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "inStock",
      sorter: (a, b) => a.inStock - b.inStock,
    },
    {
      title: <Label content="Price" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `₦${price.toLocaleString()}`,
    },
    {
      title: <Label content="Status" className="font-semibold text-OWANBE_TABLE_TITLE" />,
      dataIndex: "status",
      render: (status) => {
        const style = status === "Available"
          ? { color: "#009A44", backgroundColor: "#E6F5ED" }
          : { color: "#F68D2E", backgroundColor: "#FDE8D5" };

        return (
          <span
            style={{
              ...style,
              padding: "2px 10px",
              borderRadius: "25px",
              fontWeight: "500",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {status}
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
          onClick={() => setShowViewProduct(true)}
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
        
        >
          Delete
        </Button>
      ),
      key: "3",
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

  const handleProductSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearchText(e.target.value);
  };


  const filteredProductData = ProductData.filter((item) =>
    item.product.toLowerCase().includes(productSearchText.toLowerCase())
  );

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
    <React.Fragment>
      {
        !showViewProduct && !showNewProduct && (
          <>
           <Space direction="vertical" size="middle" className="w-full">
       <Space
  direction="horizontal"
  className="w-full justify-between items-center"
  style={{ display: "flex", alignItems: "center" }}
>
  <Heading5 className="-mb-2" content={"Product"} />
</Space>

<Paragraph
  className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
  content={"Manage and create your event product here."}
  styles={{ fontWeight: "normal !important" }}
/>
<div className="flex items-center">
  <ToggleSwitch
    isActive={isToggled}
    onToggle={handleToggle}
    label="Registration toggle"
  />
  
  <span
    className={`font-BricolageGrotesqueMedium font-medium text-sm ${isToggled ? "text-OWANBE_DARK" : "text-gray-400"}`}
    style={{ marginLeft: "12px" }}
  >
    {isToggled ? "Stop Product sales" : "Start product sales"}
    
    <a
      href="https://ostivities.tawk.help/article/how-to-start-and-stop-ticket-registration-on-ostivities"
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginLeft: "8px" }}
    >
      <Tooltip title="Click to learn more">
        <QuestionCircleOutlined style={{ fontSize: "18px", color: "#858990" }} />
      </Tooltip>
    </a>
  </span>
</div>



<Button
  type="primary" 
  size="large"
  className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white float-end"
  style={{
    borderRadius: "20px",
    fontFamily: "BricolageGrotesqueMedium",
    margin: "5px",
  }}
  onClick={() => setShowNewProduct(true)}
>
  <PlusOutlined />
  <span className="pl-1">Add New Product</span>
</Button>

      <Space className="w-full justify-between">
        <Input
          placeholder="Search product Name"
          onChange={handleProductSearch}
          style={{ width: 300 }}
        />
        {selectedProductRowKeys.length > 0 && (
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
              onClick={() => handleExport("excel", ProductData.filter((item) => selectedProductRowKeys.includes(item.key)), productColumns, "ProductHistory")}
            >
              <FileExcelOutlined />
            </Button>
            <Button
              type="default"
              className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold"
              style={{ borderRadius: 15 }}
              onClick={() => handleExport("pdf", ProductData.filter((item) => selectedProductRowKeys.includes(item.key)), productColumns, "ProductHistory")}
            >
              <FilePdfOutlined />
            </Button>
          </Space>
        )}
      </Space>

      <Table
        rowSelection={{
          selectedRowKeys: selectedProductRowKeys,
          onChange: (keys) => setSelectedProductRowKeys(keys),
        }}
        columns={productColumns}
        dataSource={filteredProductData}
        pagination={{
          current: currentProductPage,
          pageSize: productPageSize,
          onChange: (page, size) => {
            setCurrentProductPage(page);
            setProductPageSize(size);
          },
        }}
        scroll={{ x: "max-content" }}
      />
      {/* </TabPane>
        </Tabs> */}
    </Space>
          </>
        )
      }
      {
        showNewProduct && (
          <NewProduct />
        )
      }
      {
        showViewProduct && (
          <ViewProduct />
        )
      }
    </React.Fragment>
  );
};

export default Productlist;
