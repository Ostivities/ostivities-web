import { IoCartOutline } from "react-icons/io5";
import React, { useState } from "react";
import { Drawer, Button, InputNumber, Steps, Form, Input, Col, Row, Select, Radio } from "antd";
import "@/app/globals.css";
import TextArea from "antd/es/input/TextArea";
import QuickViewModal from "@/app/components/OstivitiesModal/QuickViewModal";

const EventStore = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "40cm Rose Bear", price: 30000, quantity: 1, image: "/test1.jpeg" },
    { id: 2, name: "25cm Rose Bear", price: 30000, quantity: 2, image: "/test1.jpeg" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const handleCountryChange = (value: string) => {
    // Logic to dynamically update states based on selected country
    
  };
  const [shippingMethod, setShippingMethod] = useState("flatRate");


  const handleAddToCart = (item: any) => {
    const itemExists = cartItems.find(cartItem => cartItem.id === item.id);
    if (itemExists) {
      const updatedItems = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setCartCount(cartItems.length + 1);
  };

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number | string) => {
    const newItems = cartItems.filter(cartItem => cartItem.id !== id);
    setCartItems(newItems);
    setCartCount(newItems.length);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const steps = ["Cart", "Shipping", "Payment"];


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
    
    setModalOpen(false);
  };

  return (
    <section className="flex flex-col mt-1">
      {/* Header with Cart */}
      <div className="flex items-center justify-between mb-6">
        <h2
          style={{
            fontSize: "20px",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: "400",
            margin: 0,
          }}
        >
          Event Merchandise
        </h2>

        {/* Cart Icon with Badge */}
        <div style={{ position: "relative" }} onClick={handleDrawerOpen}>
          <IoCartOutline
            style={{
              fontSize: "24px",
              color: "#000000",
              cursor: "pointer",
            }}
          />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-13px",
                right: "-10px",
                backgroundColor: "#e20000",
                color: "#fff",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "regular",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Product Listings */}
      <div
        className="grid gap-2 md:gap-4"
        style={{
          padding: "0rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="text-start p-4 rounded-md relative group"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              boxShadow: "0px 8px 24px 0px #00000014",
              backgroundColor: "#ffffff",
              maxWidth: "250px",
              borderRadius: "15px",
              margin: "0",
            }}
          >
            {/* Image with Quick View Overlay */}
            <div className="relative">
              <img
                src="/test3.jpeg"
                alt="Sherpa Mule"
                className="w-full  object-cover rounded-md mb-4"
                style={{ maxWidth: "250px", maxHeight: "150px", margin: "0 auto" }}
              />
              {/* Quick View Overlay */}
              <button
                className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderRadius: "15px",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
                onClick={() =>
                  openQuickView({
                    id: index,
                    name: "Sherpa Mule",
                    price: 22000,
                    image: "/test1.jpeg",
                    images: []
                  })
                }
              >
                Quick View
              </button>
            </div>

            {/* Product Info */}
            <h3
              className="text-sm font-regular"
              style={{ marginBottom: "5px", marginTop: "10px" }}
            >
              Sherpa Mule
            </h3>
            <p
              className="text-black text-md font-bold"
              style={{ marginBottom: "16px" }}
            >
              ₦22,000
            </p>
            <button
              className="bg-white border border-[#e20000] text-[#e20000] py-3 rounded-md"
              style={{
                width: "100%",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: "regular",
                borderRadius: "10px",
              }}
              onClick={() =>
                handleAddToCart({
                  id: index,
                  name: "Sherpa Mule",
                  price: 22000,
                  image: "/test1.jpeg",
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Drawer */}
      <div className="cart-page-container" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
        {/* Cart Drawer */}
        <Drawer
          title="Cart"
          placement="right" // Ensures it's on the right side
          onClose={handleDrawerClose}
          open={isDrawerOpen}
          width="50%" // Restricts to half the page
          style={{ width: "50%", fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          {/* Steps Navigation */}
          <Steps
            current={currentStep}
            style={{
              marginBottom: "40px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
            responsive={false}
            labelPlacement="vertical"
            items={steps.map((step) => ({
              title: step,
            }))}
            className="custom-steps"
          />

          {/* Cart Step */}
          {currentStep === 0 && (
            cartItems.length > 0 ? (
              <div>
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #ddd",
                      padding: "10px 0",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                    <div style={{ flex: 1, marginLeft: "10px" }}>
                      <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
                      <p style={{ margin: 0 }}>₦{item.price.toLocaleString()}</p>
                    </div>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.id, value ?? 1)}
                      style={{ marginRight: "10px" }}
                    />

                    <Button
                      type="link"
                      danger
                      onClick={() => removeItem(item.id)}
                      style={{ padding: 0, fontFamily: "'Bricolage Grotesque', sans-serif", }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="link"
                  danger
                  onClick={clearCart}
                  style={{
                    marginTop: "5px",
                    padding: 0,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  Clear Cart
                </Button>
                {/* Cart Summary */}
                <div
                  style={{
                    marginTop: "5px",
                    borderTop: "1px solid #ddd",
                    paddingTop: "20px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Cart Total: ₦{totalAmount.toLocaleString()}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    Shipping fee will be added when checking out.
                  </p>
                  <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                    <Button
                      type="default"
                      onClick={handleDrawerClose}
                      style={{
                        flex: 1,
                        borderRadius: "25px",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        height: "50px",
                      }}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setCurrentStep(1)}
                      style={{
                        flex: 1,
                        borderRadius: "25px",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        height: "50px",
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column", // Added to stack the image and text vertically
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px", // or whatever height you prefer
                  textAlign: "center",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                <img
                  src="/emptycart.svg" // Replace with the correct path
                  alt="Empty Cart"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
                <p style={{ fontSize: "16px", color: "#555", marginTop: "10px" }}>
                  Your cart is empty.
                </p>
              </div>
            )
          )}
          {/* Shipping Step */}
          {currentStep === 1 && (
            <div>
              <h3
                style={{
                  marginBottom: "20px",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Shipping Details
              </h3>
              <Form
                layout="vertical"
                style={{ width: "100%" }}
                initialValues={{ remember: true }}
              >
                {/* Row 1 */}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[{ required: true, message: "Please enter your first name." }]}
                    >
                      <Input placeholder="Enter your first name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[{ required: true, message: "Please enter your last name." }]}
                    >
                      <Input placeholder="Enter your last name" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Row 2 */}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: "email", message: "Please enter a valid email address." }]}
                    >
                      <Input placeholder="Enter your email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[{ required: true, message: "Please enter your phone number." }]}
                    >
                      <Input placeholder="Enter your phone number" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Row 3 */}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Additional Phone Number"
                      name="additionalphone"
                      rules={[{ required: true, message: "Please enter your phone number." }]}
                    >
                      <Input placeholder="Enter your phone number" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[{ required: true, message: "Please enter your address." }]}
                    >
                      <Input placeholder="Enter your address" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Row 4 (Country, State, City) */}
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[{ required: true, message: "Please select your country." }]}
                    >
                      <Select placeholder="Select your country" onChange={handleCountryChange}>
                        <Select.Option value="nigeria">Nigeria</Select.Option>
                        <Select.Option value="ghana">Ghana</Select.Option>
                        <Select.Option value="kenya">Kenya</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="State"
                      name="state"
                      rules={[{ required: true, message: "Please select your state." }]}
                    >
                      <Select placeholder="Select your state">
                        <Select.Option value="lagos">Lagos</Select.Option>
                        <Select.Option value="accra">Accra</Select.Option>
                        <Select.Option value="nairobi">Nairobi</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[{ required: true, message: "Please enter your city." }]}
                    >
                      <Input placeholder="Enter your city" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Row 5 (Additional Notes) */}
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Additional Note"
                      name="additionalNote"
                      rules={[{ required: false }]}
                    >
                      <TextArea rows={4} placeholder="Enter any additional notes" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>

              {/* Shipping Method */}
              <div
                style={{
                  marginTop: "30px",
                  borderTop: "1px solid #ddd",
                  paddingTop: "20px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Shipping Method
                </h3>
                <Radio.Group
                  onChange={(e) => setShippingMethod(e.target.value)} // Update shipping method state
                  value={shippingMethod}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {/* Shipping Option */}
                  {[
                    { value: "flatRate", label: "FLAT RATE", price: "₦2,000" },
                    { value: "pickup", label: "Customer Pick-up", price: "Free" },
                    { value: "ibadan", label: "Ibadan", price: "₦1,500" },
                    { value: "lagos", label: "Within Lagos", price: "₦1,500" },
                    { value: "gig", label: "GIG", price: "₦3,000" },
                  ].map((method) => (
                    <div
                      key={method.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #eee",
                        padding: "10px 0",
                      }}
                    >
                      <Radio value={method.value} style={{ flex: 1 }}>
                        {method.label}
                      </Radio>
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          color: "#333",
                          marginLeft: "10px",
                        }}
                      >
                        {method.price}
                      </span>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
                <Button
                  onClick={() => setCurrentStep(0)} // Go back to cart
                  style={{
                    flex: 1,
                    borderRadius: "25px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    height: "50px",
                  }}
                >
                  Back to Cart
                </Button>
                <Button
                  type="primary"
                  onClick={() => setCurrentStep(2)} // Proceed to payment
                  style={{
                    flex: 1,
                    borderRadius: "25px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    height: "50px",
                  }}
                >
                  Proceed
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3
                style={{
                  marginBottom: "20px",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Payment
              </h3>
              <p
                style={{
                  marginBottom: "20px",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "14px",
                }}
              >
                Please review your order and proceed to payment.
              </p>

              {/* Payment Summary */}
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                <div style={{ marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>
                    ORDER #00021
                  </h2>
                  <p style={{ color: "#555", fontSize: "14px", margin: "5px 0" }}>
                    08 Dec 2024
                  </p>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 style={{ marginBottom: "15px", fontSize: "16px", fontWeight: "bold" }}>
                    Order Summary
                  </h3>
                  <div style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                    {/* Item 1 */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <img
                        src="/test1.jpeg"
                        alt="40cm Rose Bear"
                        style={{ borderRadius: "5px", width: "50px", height: "50px" }}
                      />
                      <div style={{ flex: 1, marginLeft: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px" }}>40cm Rose Bear (x1)</p>
                      </div>
                      <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                        ₦30,000
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="/test1.jpeg"
                        alt="25cm Rose Bear"
                        style={{ borderRadius: "5px", width: "50px", height: "50px" }}
                      />
                      <div style={{ flex: 1, marginLeft: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px" }}>25cm Rose Bear (x2)</p>
                      </div>
                      <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>
                        ₦15,000
                      </p>
                    </div>
                  </div>
                </div>

                {/* Totals */}
                <div style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px" }}>Discount</p>
                    <p style={{ margin: 0, fontSize: "14px" }}>₦0</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px" }}>Tax</p>
                    <p style={{ margin: 0, fontSize: "14px" }}>₦0</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: "14px" }}>Shipping fee</p>
                    <p style={{ margin: 0, fontSize: "14px" }}>₦2,000</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                      fontSize: "16px",
                      marginTop: "10px",
                      borderTop: "1px solid #eee",
                      paddingTop: "10px",
                    }}
                  >
                    <p style={{ margin: 0 }}>Total Price</p>
                    <p style={{ margin: 0 }}>₦62,000</p>
                  </div>
                </div>
              </div>


              <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
                {/* Button to go back to shipping */}
                <Button
                  onClick={() => setCurrentStep(1)} // Back to Shipping
                  style={{
                    flex: 1,
                    borderRadius: "25px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    height: "50px",
                  }}
                >
                  Back to Shipping
                </Button>

                {/* Button to complete payment */}
                <Button
                  type="primary"
                  style={{
                    flex: 1,
                    borderRadius: "25px",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    height: "50px",
                  }}
                  onClick={() => alert("Payment Successful!")} // Replace with actual payment logic
                >
                  Make Payment
                </Button>
              </div>
            </div>
          )}

        </Drawer>
        {/* Quick View Modal */}
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
    </section>
  );
};

export default EventStore;