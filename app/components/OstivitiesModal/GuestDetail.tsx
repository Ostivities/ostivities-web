import { IModal } from "@/app/utils/interface";
import { Button, Form, Input, Modal, Space } from "antd";
import React from "react";
import { Label, Paragraph } from "../typography/Typography";

const GuestDetail = ({ open, onCancel, onOk, data }: IModal) => {
  console.log(data, "modal data");

  return (
    <Modal
      title={
        <Space direction="vertical" size={"large"}>
          <Paragraph content={data?.eventType} className="pb-5 text-2xl" />
        </Space>
      }
      open={open}
      onOk={onOk}
      onCancel={() => {
        onCancel();
      }}
      footer={
        <Space className=" mx-auto text-center w-full flex flex-row justify-center pb-5">
          <Button
            type={"primary"}
            size="large"
            className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold rounded-2xl mx-auto place-self-center`}
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={onCancel}
          >
            Resend confirmation Email
          </Button>
        </Space>
      }
      width={700}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 pb-4">
        {/* Ticket Name Field */}
        <Space direction="vertical" size={"small"}>
          <Label
            content="Ticket Name(s)"
            className="font-BricolageGrotesqueRegular"
          />
          {Array.isArray(data?.eventName) ? (
            data.eventName.map((ticketName: string, index: number) => (
              <Input key={index} readOnly defaultValue={ticketName} />
            ))
          ) : (
            <Input readOnly defaultValue={data?.eventName} />
          )}
        </Space>
 {/* Order Quantity Field */}
 <Space direction="vertical" size={"small"}>
          <Label content="Order Qty" className="font-BricolageGrotesqueRegular" />
          {Array.isArray(data?.ticketSold) ? (
            data.ticketSold.map((quantity: number, index: number) => (
              <Input key={index} readOnly defaultValue={quantity} />
            ))
          ) : (
            <Input readOnly defaultValue={data?.ticketSold} />
          )}
        </Space>

        {/* Email Field */}
        <Space direction="vertical" size={"small"}>
          <Label content="Email" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.eventType} />
        </Space>

        {/* Phone number */}
        <Space direction="vertical" size={"small"}>
          <Label
            content="Phone number"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={2347062383712} />
        </Space>

        {/* Amount */}
        <Space direction="vertical" size={"small"}>
          <Label content="Amount" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.revenue} />
        </Space>

        {/* Ostivities Fees */}
        <Space direction="vertical" size={"small"}>
          <Label content="Ostivities Fees" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.fees} />
        </Space>

        {/* Order Number */}
        <Space direction="vertical" size={"small"}>
          <Label content="Order Number" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.sales} />
        </Space>

        {/* Order Date */}
        <Space direction="vertical" size={"small"}>
          <Label content="Order Date" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.dateCreated} />
        </Space>
      </div>
      <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size">
    Additional Information.
  </h3> 
  <Form layout="vertical">
    <Form.Item
      label="Information 1"
      name="information1"
    >
      <Input type="text" placeholder="answer will be here" readOnly />
    </Form.Item>
    <Form.Item
      label="Information 2"
      name="information2"
    >
      <Input type="text" placeholder="answer will be here" readOnly />
    </Form.Item>
  </Form>
  <br/>
</Modal>
  );
};

export default GuestDetail;
