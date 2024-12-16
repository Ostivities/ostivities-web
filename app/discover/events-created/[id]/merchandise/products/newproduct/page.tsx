"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, message, Upload } from "antd";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { Heading5 } from "@/app/components/typography/Typography";
import QuickViewModal from "@/app/components/OstivitiesModal/PreviewProductModal";


const { TextArea } = Input;

const NewProductDetails = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAddProduct = () => {
    message.success("Product added successfully");
    router.back();
  };

  interface ProductDetails {
    id: number;
    name: string;
    price: number;
    images: string[]; // Array of images
    image: string;
    description?: string; // If 'description' is optional
  }

  const product = {
    id: 1,
    name: "Claut Stride",
    price: 43000,
    image: "/test1.jpeg",
    images: ["/test1.jpeg", "/test1.jpeg", "/test1.jpeg"], // Array of images
    description: "The C L A U T Stride stands out with its ergonomic design...",
  };

  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const openQuickView = (product: ProductDetails) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    console.log("Closing modal");
    setModalOpen(false);
  };


  return (
    <div
      style={{
        width: "100%",
        padding: "10px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
      }}
    >
      <Form
        layout="vertical"
        className="w-full space-y-4 px-6 py-5"
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          fontFamily: "'Bricolage Grotesque', sans-serif",
        }}
      >
         <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
  }}
>
        <Heading5
    className="mb-2"
    content={"Create Product"}
    styles={{
      fontFamily: "'Bricolage Grotesque', sans-serif",
    }}
  />
  <Button
    type="primary"
    size="large"
    className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
    style={{
      borderRadius: "20px",
      fontFamily: "BricolageGrotesqueMedium",
      margin: "5px",
    }}
    onClick={() =>
      openQuickView({
        id: 1,
        name: "Sherpa Mule",
        price: 22000,
        image: "/test1.jpeg",
        images: []
      })
    }
  >
    <span className="pl-1">Preview</span>
  </Button>
  </div>
        {/* Product Images */}
        <Form.Item
          label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Product Images</span>}
        >
          <Upload.Dragger
            multiple
            accept="image/*"
            listType="picture"
            style={{
              padding: "20px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            <p>Drag or drop images</p>
            <p>Recommended dimensions: 512px x 512px, Max file size: 5MB</p>
          </Upload.Dragger>
        </Form.Item>

        {/* Product Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Form.Item
            label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Product Name</span>}
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name!" },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Short Description (Optional)</span>}
            name="shortDescription"
          >
            <Input placeholder="Enter short description" disabled /> 
          </Form.Item>
        </div>
        <Form.Item
          label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Product Description (Optional)</span>}
          name="productDescription"
        >
          <TextArea rows={4} placeholder="Enter detailed description" />
        </Form.Item>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Form.Item
            label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Cost Price</span>}
            name="costPrice"
            rules={[
              { required: true, message: "Please enter the cost price!" },
            ]}
          >
            <Input placeholder="Enter amount" />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Discounted Price (Optional)</span>}
            name="discountedPrice"
          >
            <Input placeholder="Enter amount" />
          </Form.Item>
        </div>

        {/* Product Inventory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Form.Item
            label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Stock Quantity</span>}
            name="stockQuantity"
            rules={[
              { required: true, message: "Please enter the stock quantity!" },
            ]}
          >
            <Input placeholder="Enter quantity" />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Unit (Optional)</span>}
            name="unit"
          >
            <Select placeholder="Select unit">
              <Select.Option value="pc">PC</Select.Option>
              <Select.Option value="kg">KG</Select.Option>
            </Select>
          </Form.Item>
        </div>

        {/* Actions */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}
        >
           <Button
              type="default"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
              style={{ marginBottom: '5px', marginRight: '10px' }}
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              style={{ marginBottom: '5px' }}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>
      </Form>
       <QuickViewModal
       isOpen={isModalOpen}
       onClose={handleCloseModal}
       product={{
         id: 1,
         name: "Sherpa Mule",
         price: 22000,
         image: "/test1.jpeg",
         images: ["/test1.jpeg", "/test2.jpeg", "/test3.jpeg","/test4.jpeg"],
         description: "Introducing the Sherpa mules, a luxury mule silhouette ideal for normal and cool weather, with an internal and external sherpa construction and wrapped tonal leather detailing.",
       }}
     />
    </div>
  );
};

export default NewProductDetails;
