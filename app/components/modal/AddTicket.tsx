import { IModal } from "@/app/utils/interface";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { Heading5 } from "../typography/Typography";

function AddTicketModal({ open, onCancel, onOk }: IModal) {
  const [active, setActive] = useState<string>("");
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
        width={700}
      >
        <div className="flex flex-col space-y-7 py-6">
          <div
            className={`w-full py-5 flex flex-row items-start justify-between ticket-category px-6`}
          >
            <div className="flex flex-col">
              <h5>Single Ticket</h5>
              <p>Grants entry for one person to the event.</p>
            </div>
          </div>

          <div
            className={`w-full py-5 flex flex-row items-start justify-between ticket-category px-6`}
          >
            <div className="flex flex-col">
              <h5>Collective Ticket</h5>
              <p>Grants entry for more than one person to the event.</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddTicketModal;
