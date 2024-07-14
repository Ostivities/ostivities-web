import { IModal } from "@/app/utils/interface";
import { Modal } from "antd";
import React from "react";
import { Heading5 } from "../typography/Typography";
import SingleTicket from "./SingleTicket";

const UpdateTicket = ({ open, onCancel, onOk }: IModal): JSX.Element => {
  return (
    <Modal
      title={
        <>
          <Heading5 content={"Update Ticket"} className="" />
        </>
      }
      open={open}
      onOk={onOk}
      onCancel={() => {
        onCancel();
      }}
    >
      <SingleTicket />
    </Modal>
  );
};

export default UpdateTicket;
