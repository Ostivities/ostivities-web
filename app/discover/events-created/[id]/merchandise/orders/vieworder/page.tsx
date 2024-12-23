"use client";
import React, { useState } from "react";
import { Button, Space, Tag, message } from "antd";
import "@/app/globals.css";
import { Heading5 } from "@/app/components/typography/Typography";
import { useRouter } from "next/navigation";

const ViewOrderDetails = () => {
  const [shippingStatus, setShippingStatus] = useState("Shipped");
  const router = useRouter();

  const handleToggleShippingStatus = (status: string) => {
    setShippingStatus(status);
    message.success(`Shipping status updated to ${status}`);
  };
  const handleBack = () => {
    router.back();
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr", // Header takes auto height, grid takes the rest
        gridTemplateColumns: "1fr 1fr", // Two columns for the grid content
        gap: "20px",
        padding: "20px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          gridColumn: "1 / -1", // Spans across both columns
          marginBottom: "20px",
        }}
      >
        <Space
          direction="horizontal"
          className="w-full justify-between items-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Heading5 className="-mb-2" content={"Order Details"} />
          <Button
            type="default"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
            style={{ marginBottom: '5px', marginRight: '10px' }}
            onClick={handleBack}
          >
            Back
          </Button>
        </Space>
      </div>
      {/* Left Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Order Details */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0", // Light grey border
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* Left: Order Information */}
            <h3 style={{ fontWeight: "600", fontSize: "18px", color: "#333" }}>
              Order #00002
            </h3>

            {/* Right: Date and Name */}
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: 300, color: "#7D7D7D", margin: 0 }}>
                <strong>Date:</strong>
                <span style={{ color: "#000", fontWeight: 400, marginLeft: "5px" }}>
                  Dec 9, 2024
                </span>
              </p>
            </div>
          </div>

          <div style={{ height: "0.5px", backgroundColor: "#e0e0e0", margin: "20px 0" }}></div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ fontWeight: 300, color: "#7D7D7D" }}>
                <strong>Order Status:</strong>
              </p>
              <Tag color="green" style={{ borderRadius: "8px" }}>
                Completed
              </Tag>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ fontWeight: 300, color: "#7D7D7D", }}>
                <strong>Payment:</strong>
              </p>
              <Tag color="blue" style={{ borderRadius: "8px" }}>
                Paid
              </Tag>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p style={{ fontWeight: 300, color: "#7D7D7D", }}>
                <strong>Shipping Status:</strong>
              </p>
              <Tag color="purple" style={{ borderRadius: "8px" }}>
                Shipped
              </Tag>
            </div>
          </div>
          <div style={{ height: "0.5px", backgroundColor: "#e0e0e0", margin: "20px 0" }}></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontWeight: 300, color: "#7D7D7D", marginBottom: "5px" }}>
                <strong>Billing Address:</strong>
              </p>
              <p style={{ fontWeight: 300, color: "#000", margin: 0 }}>
                Number 13, Berkley Street, Ebute Meta, Lagos, Nigeria
              </p>
            </div>

            <div style={{ marginBottom: "20px", marginLeft: "80px" }}>
              <p style={{ fontWeight: 300, color: "#7D7D7D", marginBottom: "5px" }}>
                <strong>Customer Name:</strong>
              </p>
              <p style={{ fontWeight: 300, color: "#000", margin: 0 }}>
                Mark John
              </p>
              <br />
              <p style={{ fontWeight: 300, color: "#7D7D7D", marginBottom: "5px" }}>
                <strong>Contact Details:</strong>
              </p>
              <p style={{ fontWeight: 300, color: "#000", margin: 0 }}>
                08030678469
              </p>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0", // Light grey border
          }}
        >
          <h3 style={{ fontWeight: "600", fontSize: "16px" }}>Products</h3>
          <div style={{ height: "0.5px", backgroundColor: "#e0e0e0", margin: "20px 0" }}></div>

          {/* Product 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
            <img
              src="/test2.jpeg"
              alt="Product"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "600" }}>Sheper Mule Pro</p>
              <p style={{ margin: 0 }}>1 x ₦700.00</p>
            </div>
          </div>

          {/* Product 2 */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img
              src="/test3.jpeg"
              alt="Product"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "600" }}>Sherper Mule</p>
              <p style={{ margin: 0 }}>2 x ₦500.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Payment Summary */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0", // Light grey border
          }}
        >
          <h3 style={{ fontWeight: "600", fontSize: "16px", marginBottom: "20px" }}>Payment Summary</h3>
          <div style={{ height: "0.5px", backgroundColor: "#e0e0e0", margin: "20px 0" }}></div>

          <div>
            {/* Sub Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ fontWeight: "400", fontSize: "16px", color: "#333", margin: 0 }}>
                Sub Total
              </h3>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>
                  <span
                    style={{
                      color: "#000",
                      fontWeight: 400,
                      fontSize: "15px",
                    }}
                  >
                    ₦700.00
                  </span>
                </p>
              </div>
            </div>

            {/* Shipping Fee */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ fontWeight: "400", fontSize: "16px", color: "#333", margin: 0 }}>
                Shipping Fee
              </h3>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>
                  <span
                    style={{
                      color: "#000",
                      fontWeight: 400,
                      fontSize: "15px",
                    }}
                  >
                    ₦1,000.00
                  </span>
                </p>
              </div>
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px", // Slight separation from previous rows
                borderTop: "1px solid #e0e0e0", // Add a subtle line above the total
                paddingTop: "10px", // Padding to separate the total from the border
              }}
            >
              <h3 style={{ fontWeight: "600", fontSize: "18px", color: "#333", margin: 0 }}>
                Total
              </h3>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0 }}>
                  <span
                    style={{
                      color: "#000",
                      fontWeight: "600", // Emphasize the total amount
                      fontSize: "16px",
                    }}
                  >
                    ₦1,700.00
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Additional Note */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0", // Light grey border
          }}
        >
          <h3 style={{ fontWeight: "600", fontSize: "16px" }}>Additional Note</h3>
          <div style={{ height: "0.5px", backgroundColor: "#e0e0e0", margin: "20px 0" }}></div>
          <p style={{ fontWeight: 300, color: "#000", margin: 0 }}>
            Please ensure the product is securely packaged to avoid damage during transit.
            Deliver between 9 AM and 12 PM as the recipient may not be available later in the day.
            Contact the provided phone number for confirmation before delivery.</p>
        </div>


        {/* Shipping Section */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E0E0E0", // Light grey border
          }}
        >
          <h3 style={{ fontWeight: "600", fontSize: "16px" }}>Shipping</h3>
          <div style={{ height: "0.5px", backgroundColor: "#e0e0e0", margin: "20px 0" }}></div>

          <p style={{ fontWeight: 300, color: "#7D7D7D", marginBottom: "15px" }}>
            <strong>Select shipping status:</strong>
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type={shippingStatus === "Shipped" ? "primary" : "default"}
              onClick={() => handleToggleShippingStatus("Shipped")}
              style={{
                padding: "10px 40px",
                borderRadius: "10px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "14px",
              }}
            >
              Shipped
            </Button>
            <Button
              type={shippingStatus === "Delivered" ? "primary" : "default"}
              onClick={() => handleToggleShippingStatus("Delivered")}
              style={{
                padding: "10px 40px",
                borderRadius: "10px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "14px",
              }}
            >
              Delivered
            </Button>
            <Button
              type={shippingStatus === "Returned" ? "primary" : "default"}
              onClick={() => handleToggleShippingStatus("Returned")}
              style={{
                padding: "10px 40px",
                borderRadius: "10px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "14px",
              }}
            >
              Returned
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;