import { IModal } from "@/app/utils/interface";
import { Modal, Button, message, Space } from "antd";
import React from "react";
import { Heading5 } from "../typography/Typography";
import SingleTicket from "./SingleTicket";
import EditSingleTicket from "./EditSingleTicket";
import EditCollectiveTicket from "./EditCollectiveTicket";
import { Paragraph } from "../typography/Typography";
import ShieldIcon from "@/app/components/Icons/ShieldIcon";


const UpdateTicket = ({
  open,
  onCancel,
  onOk,
  id,
  ticketEntity,
  dataToDelete,
}: IModal): JSX.Element => {
  // console.log(id)
  // const { id } = data;

  // Function to handle the update button click
  // const handleUpdate = () => {
    // message.success('Ticket updated successfully'); // Success message
    // onOk(); // Call onOk to perform any additional actions
  // };

  return (
    <Modal
      title={<Heading5 content={"Update Ticket"} className="" />}
      open={open}
      onCancel={onCancel}
      footer={
        <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
          {/* <Button
            size="large"
            onClick={onCancel}
            className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold`}
            style={{ marginRight: 8, borderRadius: 20 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleUpdate}
            className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
            style={{ borderRadius: 20 }}
          >
            Update
          </Button> */}
        </div>
      }
    >
      {dataToDelete?.[0]?.eventStatus > 0 ? 
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size={"small"}
        className="pb-7 pt-8"
      >
        <div className="mx-auto text-center flex flex-row w-full justify-center items-center">
        <ShieldIcon />
        </div>
        <Paragraph
          content={"You cannot update a ticket for an active event"}
          className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center mx-auto mt-5"
          styles={{ fontWeight: "normal !important" }}
        />
      </Space>
      : ticketEntity === "SINGLE" ? (
        <EditSingleTicket onCancel={onCancel} id={id} onOk={onOk} />
      ) : (
        <EditCollectiveTicket onCancel={onCancel} id={id} onOk={onOk} />
      )}
    </Modal>
  );
};

export default UpdateTicket;
