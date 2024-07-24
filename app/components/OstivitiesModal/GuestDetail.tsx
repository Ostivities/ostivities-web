import { IModal } from "@/app/utils/interface";
import { Button, Input, Modal, Space } from "antd";
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
        <Space direction="vertical" size={"small"}>
          <Label
            content="Ticket Name"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.eventName} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label content="Email" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.eventType} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Phone number"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={2347062383712} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label content="Amount" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.revenue} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Ostivities Fees"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.fees} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Order Qty"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.ticketSold} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Order Number"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.sales} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Order Date"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.dateCreated} />
        </Space>
      </div>
    </Modal>
  );
};

export default GuestDetail;
