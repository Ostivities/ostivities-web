import { Heading5, Label } from "@/app/components/typography/Typography";
import { useFormContext } from "@/app/contexts/form-context/FormContext";
import { TICKET_TYPE } from "@/app/utils/enums";
import { FieldType, IModal } from "@/app/utils/interface";
import Ticket from "@/public/Ticket-Slant.svg";
import { Button, Form, Input, Modal, Select, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

function AddTicketModal({ open, onCancel, onOk }: IModal): JSX.Element {
  const { formState, setFormStage } = useFormContext();
  const { Option } = Select;
  const [activeItem, setActive] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FieldType>({
    // resolver: yupResolver(schema),
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
        classNames={{ header: "", body: "", content: "", footer: "" }}
        width={700}
        footer={(params: any) => (
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
                  Cancel
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
                  Continue
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                size={"large"}
                className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
                onClick={() => {
                  if (activeItem !== "") {
                    setShow(true);
                  }
                }}
              >
                Continue
              </Button>
            )}
          </div>
        )}
      >
        {show ? (
          <form
            className="w-full flex flex-col space-y-7 mt-8 pt-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center">
              <Label content="Ticket Type" className="w-1/3" />
              <Controller
                name="ticketType"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Select Ticket Type"
                    {...field}
                    style={{ width: "100%" }}
                    className="w-3/4"
                  >
                    <Option value={TICKET_TYPE.PAID}>Paid</Option>
                    <Option value={TICKET_TYPE.FREE}>Free</Option>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-row items-center">
              <Label content="Ticket Name" className="w-1/3" />
              <Controller
                name="ticketName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Ticket Name" />
                )}
              />
            </div>

            <div className="flex flex-row items-center">
              <Label content="Ticket Stock" className="w-1/3" />
              <Controller
                name="ticketStock"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Ticket Name" />
                )}
              />
            </div>

            <div className="flex flex-row items-center">
              <Label content="Ticket Price" className="w-1/3" />
              <Controller
                name="ticketPrice"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Ticket Price" />
                )}
              />
            </div>

            <div className="flex flex-row items-center">
              <Label content="Purchase Limit" className="w-1/3" />
              <Controller
                name="purchaseLimit"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Purchase Limit" />
                )}
              />
            </div>

            <div className="flex flex-row items-start">
              <Label content="Ticket Description" className="w-1/3" />
              <Controller
                name="ticketDescription"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Enter Description"
                    style={{
                      height: "200px !important",
                      paddingTop: "10px !important",
                    }}
                    className="py-3"
                  />
                )}
              />
            </div>
          </form>
        ) : (
          <div className="flex flex-col space-y-7 py-9">
            <div
              className={`w-full py-8 flex flex-row items-start justify-between ticket-category px-6 ${
                activeItem === "Single Ticket"
                  ? "border border-OWANBE_PRY rounded-[20px]"
                  : ""
              } transition-all ease-in-out`}
              onClick={() => setActive("Single Ticket")}
            >
              <div className="flex flex-col space-y-2">
                {activeItem === "Single Ticket" ? (
                  <h6 className="ticket-title">Single Ticket</h6>
                ) : (
                  <h5
                    className={`${
                      activeItem === "Single Ticket"
                        ? "ticket-title text-OWANBE_PRY"
                        : ""
                    }`}
                  >
                    Single Ticket
                  </h5>
                )}

                {activeItem === "Single Ticket" ? (
                  <span className="ticket-subtitle">
                    Grants entry for one person to the event.
                  </span>
                ) : (
                  <p
                    className={`${
                      activeItem === "Single Ticket" ? "text-OWANBE_PRY" : ""
                    }`}
                  >
                    Grants entry for one person to the event.
                  </p>
                )}
              </div>

              <Image src={Ticket} alt="ticket" />
            </div>

            <div
              className={`w-full py-8 flex flex-row items-start justify-between ticket-category px-6 ${
                activeItem === "Collective Ticket"
                  ? "border border-OWANBE_PRY rounded-[20px]"
                  : ""
              } transition-all ease-in-out`}
              onClick={() => setActive("Collective Ticket")}
            >
              <div className="flex flex-col space-y-2">
                {activeItem === "Collective Ticket" ? (
                  <h6 className="ticket-title">Collective Ticket</h6>
                ) : (
                  <h5
                    className={`${
                      activeItem === "Single Ticket"
                        ? "ticket-title text-OWANBE_PRY"
                        : ""
                    }`}
                  >
                    Collective Ticket
                  </h5>
                )}
                {activeItem === "Collective Ticket" ? (
                  <span className="ticket-subtitle">
                    Grants entry for more than one person to the event.
                  </span>
                ) : (
                  <p
                    className={`${
                      activeItem === "Single Ticket"
                        ? "ticket-subtitle text-OWANBE_PRY"
                        : ""
                    }`}
                  >
                    Grants entry for more than one person to the event.
                  </p>
                )}
              </div>
              <Image src={Ticket} alt="ticket" />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default AddTicketModal;
