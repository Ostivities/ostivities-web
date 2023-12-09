import { IModal } from "@/app/utils/interface";
import Ticket from "@/public/Ticket-Slant.svg";
import { Button, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { Heading5 } from "../typography/Typography";

function AddTicketModal({ open, onCancel, onOk }: IModal) {
  const [activeItem, setActive] = useState<string>("");
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
        footer={(params: any) => (
          <div className="flex flex-row items-center justify-center py-6">
            <Button
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
              style={{ height: "49px" }}
            >
              Continue
            </Button>
          </div>
        )}
      >
        <div className="flex flex-col space-y-7 py-9">
          <div
            className={`w-full py-8 flex flex-row items-start justify-between ticket-category px-6 ${
              activeItem === "Single Ticket"
                ? "border border-OWANBE_PRY rounded-[20px]"
                : ""
            }`}
            onClick={() => setActive("Single Ticket")}
          >
            <div className="flex flex-col space-y-2">
              <h5
                className={`${
                  activeItem === "Single Ticket"
                    ? "ticket-title text-OWANBE_PRY"
                    : ""
                }`}
              >
                Single Ticket
              </h5>
              <p
                className={`${
                  activeItem === "Single Ticket" ? "text-OWANBE_PRY" : ""
                }`}
              >
                Grants entry for one person to the event.
              </p>
            </div>

            <Image src={Ticket} alt="ticket" />
          </div>

          <div
            className={`w-full py-8 flex flex-row items-start justify-between ticket-category px-6 ${
              activeItem === "Collective Ticket"
                ? "border border-OWANBE_PRY rounded-[20px]"
                : ""
            }`}
            onClick={() => setActive("Collective Ticket")}
          >
            <div className="flex flex-col space-y-2">
              <h5
                className={`${
                  activeItem === "Single Ticket"
                    ? "ticket-title text-OWANBE_PRY"
                    : ""
                }`}
              >
                Collective Ticket
              </h5>
              <p
                className={`${
                  activeItem === "Single Ticket"
                    ? "ticket-subtitle text-OWANBE_PRY"
                    : ""
                }`}
              >
                Grants entry for more than one person to the event.
              </p>
            </div>
            <Image src={Ticket} alt="ticket" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddTicketModal;
