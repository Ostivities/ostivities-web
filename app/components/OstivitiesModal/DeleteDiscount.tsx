import ShieldIcon from "@/app/components/Icons/ShieldIcon";
import WarningIcon from "@/app/components/Icons/WarningIcon";
import { IModal } from "@/app/utils/interface";
import { Button, message, Modal, Space } from "antd";
import React from "react";
import { Paragraph } from "../typography/Typography";
import { useDeleteDiscount } from "@/app/hooks/discount/discount.hook";

const DeleteTicket = ({ open, onCancel, onOk, actionType, id, data }: IModal) => {
  const { deleteDiscount } = useDeleteDiscount();

  const handleDeleteClick = async () => {
    const response = await deleteDiscount.mutateAsync(id);
    if (response.status === 200) {
      onOk()
    }
  };

  return (
    <Modal
      title={null}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      className="py-8"
      footer={
        <Space
          direction="vertical"
          size={"small"}
          style={{ margin: "auto", width: "100%" }}
          className="pb-7 mx-auto text-center"
        >
          {actionType === "delete" ? (
            <Button
              type={"primary"}
              size="large"
              className={`font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold rounded-2xl mx-auto place-self-center w-2/3`}
              style={{
                borderRadius: "25px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              loading={deleteDiscount.isPending}
              onClick={handleDeleteClick}
            >
              Yes, delete
            </Button>
          ) : null}
          <Button
            type={"default"}
            size={"large"}
            className={`font-BricolageGrotesqueSemiBold  cursor-pointer font-bold  rounded-2xl mx-auto place-self-center w-2/3`}
            style={{
              borderRadius: "25px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={onCancel}
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
        <div className="mx-auto text-center flex flex-row w-full justify-center items-center">
          {actionType === "delete" && <ShieldIcon />}
        </div>
        <Paragraph
          className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center mx-auto mt-5"
          content={
            actionType === "delete"
              ? `Are you sure you want to delete this discount?`
              : `Are you sure you want to duplicate this entry?`
          }
          styles={{ fontWeight: "normal !important" }}
        />
      </Space>
    </Modal>
  );
};

export default DeleteTicket;
