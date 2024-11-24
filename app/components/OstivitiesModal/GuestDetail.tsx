import { IModal2, IModal } from "@/app/utils/interface";
import { Button, Form, Input, Modal, Space } from "antd";
import React, { useEffect } from "react";
import { Label, Paragraph } from "../typography/Typography";

const GuestDetail = ({ open, onCancel, onOk, data }: IModal) => {
  const {
    eventType,
    ticketName,
    ticketSold,
    email,
    phone,
    revenue,
    fees,
    orderNumber,
    dateCreated,
    additionalInfo,
  } = data || {};

  return (
    <Modal
      title={
        <Space direction="vertical" size="large">
          <Paragraph content={eventType} className="pb-5 text-2xl" />
        </Space>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        <Space className="mx-auto text-center w-full flex flex-row justify-center pb-5">
          <Button
            type="primary"
            size="large"
            className="font-BricolageGrotesqueSemiBold cursor-pointer font-bold rounded-2xl"
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={onCancel}
          >
            Resend Confirmation Email
          </Button>
        </Space>
      }
      width={700}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 pb-4">
        {/* Ticket Name Field */}
        <Space direction="vertical" size="small">
          <Label
            content="Ticket Bought"
            className="font-BricolageGrotesqueRegular"
          />
          {Array.isArray(ticketName) ? (
            ticketName.map((name: string, index: number) => (
              <Input key={index} readOnly value={name} />
            ))
          ) : (
            <Input readOnly value={ticketName} />
          )}
        </Space>

        {/* Order Quantity Field */}
        <Space direction="vertical" size="small">
          <Label
            content="Order Qty"
            className="font-BricolageGrotesqueRegular"
          />
          {Array.isArray(ticketSold) ? (
            ticketSold.map((quantity: number, index: number) => (
              <Input key={index} readOnly value={quantity} />
            ))
          ) : (
            <Input readOnly value={ticketSold} />
          )}
        </Space>

        {/* Email Field */}
        <Space direction="vertical" size="small">
          <Label content="Email" className="font-BricolageGrotesqueRegular" />
          <Input readOnly value={email} />
        </Space>

        {/* Phone number */}
        <Space direction="vertical" size="small">
          <Label
            content="Phone number"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly value={phone} />
        </Space>

        {/* Amount */}
        <Space direction="vertical" size="small">
          <Label content="Amount" className="font-BricolageGrotesqueRegular" />
          <Input readOnly value={revenue} />
        </Space>

        {/* Ostivities Fees */}
        <Space direction="vertical" size="small">
          <Label
            content="Ostivities Fees"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly value={fees} />
        </Space>

        {/* Order Number */}
        <Space direction="vertical" size="small">
          <Label
            content="Order Number"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly value={orderNumber} />
        </Space>

        {/* Order Date */}
        <Space direction="vertical" size="small">
          <Label
            content="Order Date"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly value={dateCreated} />
        </Space>
      </div>

      {/* Additional Information */}
      {additionalInfo && additionalInfo.length > 0 && (
        <>
          <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size">
            Additional Information.
          </h3>
          {additionalInfo.map((info: any, index: number) => (
            <Form layout="vertical" key={index}>
              <Form.Item label={info?.question} name={info?.question}>
                <Input
                  type="text"
                  placeholder={info?.answer || "No answer provided"}
                  readOnly
                />
              </Form.Item>
            </Form>
          ))}
        </>
      )}
      {/* <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size">
        Additional Information.
      </h3>
      <Form layout="vertical">
        <Form.Item label="Information 1" name="information1">
          <Input type="text" placeholder="answer will be here" readOnly />
        </Form.Item>
        <Form.Item label="Information 2" name="information2">
          <Input type="text" placeholder="answer will be here" readOnly />
        </Form.Item>
      </Form>
      <br /> */}
    </Modal>
  );
};

export default GuestDetail;
