import { IModal } from "@/app/utils/interface";
import { Modal, Button, message } from "antd";
import React from "react";
import { Heading5 } from "../typography/Typography";
import SingleTicket from "./SingleTicket";
import EditSingleTicket from "./EditSingleTicket";

const UpdateTicket = ({ open, onCancel, onOk, id }: IModal): JSX.Element => {

  // console.log(id)
  // const { id } = data;
 
  // Function to handle the update button click
  const handleUpdate = () => {

    message.success('Ticket updated successfully'); // Success message
    onOk(); // Call onOk to perform any additional actions
  };

  return (
    <Modal
      title={
        <Heading5 content={"Update Ticket"} className="" />
      }
      open={open}
      onCancel={onCancel}
      // footer={
      //   <div style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
      //     <Button
      //       size="large"
      //       onClick={onCancel}
      //       className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold`}
      //       style={{ marginRight: 8, borderRadius: 20 }}
      //     >
      //       Cancel
      //     </Button>
      //     <Button
      //       type="primary"
      //       size="large"
      //       onClick={handleUpdate}
      //       className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
      //       style={{ borderRadius: 20 }}
      //     >
      //       Update
      //     </Button>
      //   </div>
      // }
    >
      <EditSingleTicket onCancel={onCancel} id={id} />
    </Modal>
  );
};

export default UpdateTicket;
