import { IModal } from "@/app/utils/interface";
import { Button, Input, Modal, Space } from "antd";
import React from "react";
import { Label, Paragraph } from "../typography/Typography";

const CoordinatorsDetail = ({ open, onCancel, onOk, data }: IModal) => {
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
        </Space>
      }
      width={700}
    >
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 pb-4">
        <Space direction="vertical" size={"small"}>
          <Label
            content="Coordinator's Name"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.eventName} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label content="Coordinator's Email" className="font-BricolageGrotesqueRegular" />
          <Input readOnly defaultValue={data?.eventType} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Coordinator's Phone number"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={2347062383712} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Date Added"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.dateAdded} />
        </Space>

        <Space direction="vertical" size={"small"}>
          <Label
            content="Role"
            className="font-BricolageGrotesqueRegular"
          />
          <Input readOnly defaultValue={data?.eventName} />
        </Space>
      </div>
    </Modal>
  );
};

export default CoordinatorsDetail;
