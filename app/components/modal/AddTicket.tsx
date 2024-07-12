import CollectiveTicket from "@/app/components/Modal/CollectiveTicket";
import SingleTicket from "@/app/components/Modal/SingleTicket";
import { Heading5 } from "@/app/components/typography/Typography";
import { useFormContext } from "@/app/contexts/form-context/FormContext";
import { FieldType, IModal } from "@/app/utils/interface";
import TicketDoubleDark from "@/public/ticket-double-dark.svg";
import TicketDoubleRed from "@/public/ticket-double-red.svg";
import TicketSingleRed from "@/public/Ticket-redsvg.svg";
import Ticket from "@/public/Ticket-Slant.svg";
import { Button, Modal, Space } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddTicketModalProps extends IModal {
  singleTicketTitle?: string;
  singleTicketSubtitle?: string;
  collectiveTicketTitle?: string;
  collectiveTicketSubtitle?: string;
  continueButtonText?: string;
  cancelButtonText?: string;
  addButtonText?: string;
  modalWidth?: number;
  singleTicketStyles?: React.CSSProperties;
  collectiveTicketStyles?: React.CSSProperties;
  modalStyles?: {
    header?: string;
    body?: string;
    content?: string;
    footer?: string;
  };
  singleTicketTitleFontSize?: string;
  singleTicketSubtitleFontSize?: string;
  collectiveTicketTitleFontSize?: string;
  collectiveTicketSubtitleFontSize?: string;
}

function AddTicketModal({
  open,
  onCancel,
  onOk,
  singleTicketTitle = "Single Ticket",
  singleTicketSubtitle = "Grants entry for one person to the event.",
  collectiveTicketTitle = "Collective Ticket",
  collectiveTicketSubtitle = "Grants entry for more than one person to the event.",
  continueButtonText = "Continue",
  cancelButtonText = "Cancel",
  addButtonText = "Add Ticket",
  modalWidth = 700,
  singleTicketStyles,
  collectiveTicketStyles,
  modalStyles,
  singleTicketTitleFontSize = "1.25rem", // Default font size for the single ticket title
  singleTicketSubtitleFontSize = "0.8rem", // Default font size for the single ticket subtitle
  collectiveTicketTitleFontSize = "1.25rem", // Default font size for the collective ticket title
  collectiveTicketSubtitleFontSize = "0.8rem" // Default font size for the collective ticket subtitle
}: AddTicketModalProps): JSX.Element {
  const { formState, setFormStage } = useFormContext();
  const [activeItem, setActive] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setActive("Single Ticket");
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FieldType>({
    progressive: true,
    mode: "all",
  });

  const onSubmit: SubmitHandler<FieldType> = (data: any) => {
    console.log(data, "data");
  };

  return (
    <>
      <Modal
        title={
          <>
            <Heading5
              content={show ? activeItem : "Ticket Category"}
              className=""
            />
          </>
        }
        open={open}
        onOk={onOk}
        onCancel={() => {
          onCancel();
          setShow(false);
          setActive("");
        }}
        className={modalStyles?.content}
        width={modalWidth}
        footer={(
          <div className="flex flex-row items-center justify-center py-6">
            {show ? (
              <Space>
                <Button
                  type="default"
                  size={"large"}
                  className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold`}
                  onClick={() => {
                    if (activeItem !== "") {
                      setShow(false);
                    }
                  }}
                >
                  {cancelButtonText}
                </Button>
                <Button
                  type="primary"
                  size={"large"}
                  htmlType="submit"
                  className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
                  onClick={() => {
                    onCancel();
                    setShow(false);
                    setActive("");
                    setFormStage(formState.stage + 1);
                  }}
                >
                  {addButtonText}
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                size={"large"}
                className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64 rounded-2xl"
                onClick={() => {
                  if (activeItem !== "") {
                    setShow(true);
                  }
                }}
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
              >
                {continueButtonText}
              </Button>
            )}
          </div>
        )}
      >
        {show ? (
          <>
            {activeItem === "Single Ticket" ? (
              <SingleTicket />
            ) : (
              <CollectiveTicket />
            )}
          </>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 py-9">
            <div
              className={`w-full flex flex-col space-y-9 items-center justify-center py-9 px-6 ticket-category ${
                activeItem === "Single Ticket"
                  ? "border border-OWANBE_PRY rounded-[20px]"
                  : ""
              } transition-all ease-in-out`}
              onClick={() => setActive("Single Ticket")}
              style={singleTicketStyles}
            >
              <div className="flex flex-col space-y- justify-center items-center">
                {activeItem === "Single Ticket" ? (
                  <h6 className="ticket-title text-center" style={{ fontSize: singleTicketTitleFontSize }}>{singleTicketTitle}</h6>
                ) : (
                  <h5
                    className={`${
                      activeItem === "Single Ticket"
                        ? "ticket-title text-OWANBE_PRY text-center"
                        : ""
                    }`}
                    style={{ fontSize: singleTicketTitleFontSize }}
                  >
                    {singleTicketTitle}
                  </h5>
                )}

                {activeItem === "Single Ticket" ? (
                  <span className="ticket-subtitle text-center" style={{ fontSize: singleTicketSubtitleFontSize }}>
                    {singleTicketSubtitle}
                  </span>
                ) : (
                  <p
                    className={`${
                      activeItem === "Single Ticket"
                        ? "text-OWANBE_PRY text-center"
                        : "text-center"
                    }`}
                    style={{ fontSize: singleTicketSubtitleFontSize }}
                  >
                    {singleTicketSubtitle}
                  </p>
                )}
              </div>

              <Image
                src={activeItem === "Single Ticket" ? Ticket : TicketSingleRed}
                alt="ticket"
                className="mx-auto"
              />
            </div>

            <div
              className={`w-full flex flex-col space-y-9 items-center justify-center py-9 px-6 ticket-category ${
                activeItem === "Collective Ticket"
                  ? "border border-OWANBE_PRY rounded-[20px]"
                  : ""
              } transition-all ease-in-out`}
              onClick={() => setActive("Collective Ticket")}
              style={collectiveTicketStyles}
            >
              <div className="flex flex-col space-y-2 justify-center items-center">
                {activeItem === "Collective Ticket" ? (
                  <h6 className="ticket-title text-center" style={{ fontSize: collectiveTicketTitleFontSize }}>
                    {collectiveTicketTitle}
                  </h6>
                ) : (
                  <h5
                    className={`${
                      activeItem === "Collective Ticket"
                        ? "ticket-title text-OWANBE_PRY text-center"
                        : ""
                    }`}
                    style={{ fontSize: collectiveTicketTitleFontSize }}
                  >
                    {collectiveTicketTitle}
                  </h5>
                )}
                {activeItem === "Collective Ticket" ? (
                  <span className="ticket-subtitle text-center" style={{ fontSize: collectiveTicketSubtitleFontSize }}>
                    {collectiveTicketSubtitle}
                  </span>
                ) : (
                  <p
                    className={`${
                      activeItem === "Collective Ticket"
                        ? "ticket-subtitle text-OWANBE_PRY text-center"
                        : ""
                    }`}
                    style={{ fontSize: collectiveTicketSubtitleFontSize }}
                  >
                    {collectiveTicketSubtitle}
                  </p>
                )}
              </div>
              <Image
                src={
                  activeItem === "Collective Ticket"
                    ? TicketDoubleRed
                    : TicketDoubleDark
                }
                alt="ticket"
                className="mx-auto"
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default AddTicketModal;
