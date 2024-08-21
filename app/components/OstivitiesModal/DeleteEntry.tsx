import ShieldIcon from "@/app/components/Icons/ShieldIcon";
import { IModal } from "@/app/utils/interface";
import { Button, message, Modal, Space } from "antd";
import React from "react";
import { Paragraph } from "../typography/Typography";

const DeleteEntry = ({ open, onCancel, onOk, actionType }: IModal) => {
  const handleDeleteClick = () => {
    message.success('Entry deleted successfully'); // Success message for delete
    onOk(); // Trigger the onOk callback, which should close the modal
  };

  const handleCancelClick = () => {
    onCancel(); // Trigger the onCancel callback, which should close the modal
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={handleCancelClick}
      className="py-8"
      footer={
        <Space
          direction="vertical"
          size={"small"}
          style={{ margin: "auto", width: "100%" }}
          className="pb-7 mx-auto text-center"
        >
          <Button
            type={"primary"}
            size="large"
            className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold rounded-2xl mx-auto place-self-center w-2/3"
            style={{
              borderRadius: "25px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={handleDeleteClick}
          >
            Yes, delete
          </Button>
          <Button
            type={"default"}
            size={"large"}
            className="font-BricolageGrotesqueSemiBold cursor-pointer font-bold rounded-2xl mx-auto place-self-center w-2/3"
            style={{
              borderRadius: "25px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={handleCancelClick}
          >
            No, cancel
          </Button>
        </Space>
      }
      closeIcon={null}
    >
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size={"small"}
        className="pb-7 pt-8"
      >
        <div className="mx-auto text-center flex flex-row w-full justify-center items-center p-4 rounded-full">
          <ShieldIcon />
        </div>
        <Paragraph
          className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center mx-auto mt-5"
          content={`Are you sure you want to delete this entry?`}
          styles={{ fontWeight: "normal !important" }}
        />
      </Space>
    </Modal>
  );
};

export default DeleteEntry;
