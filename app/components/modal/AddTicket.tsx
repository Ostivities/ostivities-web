import { IModal } from "@/app/utils/interface";
import { Button, Modal } from "antd";
import React from "react";
import { Heading5 } from "../typography/Typography";

function AddTicketModal({ open, onCancel, onOk }: IModal) {
  return (
    <>
      <Modal
        title={
          <>
            <Heading5 content="Ticket Category" className="" />
          </>
        }
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        classNames={{ header: "", body: "", content: "", footer: "" }}
      >
        <div
          className={`w-full py-5 flex flex-row items-start justify-between`}
          style={{
            boxShadow: "0px 8px 24px 0px #00000014",
            background: "linear-gradient(0deg, #FFFFFF, #FFFFFF)",
          }}
        ></div>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default AddTicketModal;
