import ShieldIcon from "@/app/components/Icons/ShieldIcon";
import WarningIcon from "@/app/components/Icons/WarningIcon";
import { IModal } from "@/app/utils/interface";
import { Modal, Space } from "antd";
import React from "react";

const ValidatePayment = ({ open, onCancel, onOk, actionType, id, data }: IModal) => {
  return (
    <Modal
      title={null}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      className="py-8"
      closable={false} // Hides the close icon
      centered // Centers the modal on the screen
      footer={
        <Space
          direction="vertical"
          size={"small"}
          style={{ margin: "auto", width: "100%" }}
          className="pb-7 mx-auto text-center"
        />
      }
    >
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size={"small"}
        className="pb-7 pt-8"
      >
        {/* Centering loader and text */}
        <div className="flex flex-col justify-center items-center w-full">
          <svg
            className="animate-spin h-12 w-12 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {/* Text under loader */}
          <h2 className="font-bricolage-grotesque font-regular text-xl mt-4">
            Validating Payment!
          </h2>
        </div>
      </Space>
    </Modal>
  );
};

export default ValidatePayment;
