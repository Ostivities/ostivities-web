import ShieldIcon from "@/app/components/Icons/ShieldIcon";
import WarningIcon from "@/app/components/Icons/WarningIcon";
import { IModal } from "@/app/utils/interface";
import { Button, message, Modal, Space } from "antd";
import React from "react";
import { Paragraph } from "../typography/Typography";
import { useDeleteEvent, } from "@/app/hooks/event/event.hook";

const DeleteEvent = ({
  open,
  onCancel,
  onOk,
  actionType,
  selectedRowKeys,
  data,
}: IModal) => {

  const { deleteEvent } = useDeleteEvent();

  const handleDeleteClick = async () => {
    if (selectedRowKeys) {
      const response = await deleteEvent.mutateAsync(selectedRowKeys);
      if (response.status === 200) {
        onOk();
      }
    } else {
      message.error("No rows selected for deletion");
    }
  };
  console.log(selectedRowKeys, "selectedRowKeys");

  const handleDuplicateClick = () => {
    message.success("Entry duplicated successfully"); // Success message for duplicate
    onCancel(); // Close the modal
  };

  return (
    <Modal
      title={null}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      className="py-8"
      closeIcon={null}
      footer={
        <Space
          direction="vertical"
          size={"small"}
          style={{ margin: "auto", width: "100%" }}
          className="pb-7 mx-auto text-center"
        >
          {data === "ACTIVE" ? (
            <Button
              type={"default"}
              size={"large"}
              className="font-BricolageGrotesqueSemiBold cursor-pointer font-bold rounded-2xl mx-auto place-self-center w-2/3"
              style={{
                borderRadius: "25px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              onClick={onCancel}
            >
              Close
            </Button>
          ) : (
            <>
              {actionType === "delete" && (
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
              )}
              <Button
                type={"default"}
                size={"large"}
                className="font-BricolageGrotesqueSemiBold cursor-pointer font-bold rounded-2xl mx-auto place-self-center w-2/3"
                style={{
                  borderRadius: "25px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={onCancel}
              >
                No, cancel
              </Button>
            </>
          )}
        </Space>
      }
    >
      {data === "ACTIVE" ? (
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          size={"small"}
          className="pb-7 pt-8"
        >
          <div className="mx-auto text-center flex flex-row w-full justify-center items-center">
            {/* Icon can be added here if needed */}
          </div>
          <Paragraph
            className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center mx-auto mt-5"
            content={
              <>
                You can&apos;t delete this event because it is currently active.
                <br />
                Please deactivate the event to proceed with deletion.
              </>
            }
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>
      ) : (
        actionType === "delete" && (
          <Space
            direction="vertical"
            style={{ width: "100%" }}
            size={"small"}
            className="pb-7 pt-8"
          >
            <div className="mx-auto text-center flex flex-row w-full justify-center items-center">
              <WarningIcon />
            </div>
            <Paragraph
              className="text-OWANBE_DARK_SHADE text-sm font-normal font-BricolageGrotesqueRegular text-center mx-auto mt-5"
              content={
                <>
                  Are you sure you want to delete this event(s)?
                  <br />
                  This action is irreversible.
                </>
              }
              styles={{ fontWeight: "normal !important" }}
            />
          </Space>
        )
      )}
    </Modal>
  );
};

export default DeleteEvent;
